import { google } from 'googleapis';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import os from 'os';
import path from 'path';
import dotenv from 'dotenv';
import { HeadObjectCommand } from '@aws-sdk/client-s3';

dotenv.config();

function getDriveClient() {
  if (!process.env.GDRIVE_CREDENTIALS) {
    throw new Error('Missing GDRIVE_CREDENTIALS env variable!');
  }
  const credentials = JSON.parse(process.env.GDRIVE_CREDENTIALS);
  credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  return google.drive({ version: 'v3', auth });
}

function getB2Client() {
  if (!process.env.B2_KEY_ID || !process.env.B2_KEY || !process.env.B2_ENDPOINT) {
    throw new Error('Missing Backblaze B2 credentials in env!');
  }

  return new S3Client({
    region: 'us-west-002', // B2 region (standard)
    endpoint: process.env.B2_ENDPOINT, // np. https://s3.us-west-002.backblazeb2.com
    credentials: {
      accessKeyId: process.env.B2_KEY_ID,
      secretAccessKey: process.env.B2_KEY,
    },
    forcePathStyle: true, // wymagane przez B2
  });
}

// Pobierz nazwę folderu po ID
async function getFolderName(drive, folderId) {
  const res = await drive.files.get({
    fileId: folderId,
    fields: 'name',
  });
  return res.data.name;
}

// Pobierz listę plików i folderów w folderze (nie usuwane, nie trashed)
async function listDriveFiles(drive, folderId) {
  const res = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false`,
    fields: 'files(id, name, mimeType)',
    pageSize: 1000,
  });
  return res.data.files || [];
}

// Pobierz plik z Drive do temp
async function downloadFile(drive, fileId, destPath) {
  const dest = fs.createWriteStream(destPath);
  const res = await drive.files.get({ fileId, alt: 'media' }, { responseType: 'stream' });

  return new Promise((resolve, reject) => {
    res.data
      .on('end', () => resolve())
      .on('error', (err) => reject(err))
      .pipe(dest);
  });
}

// Funkcja sprawdzająca, czy plik już istnieje w B2
async function fileExists(s3, bucket, key) {
  try {
    await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
    return true; // plik istnieje
  } catch (err) {
    if (err.name === 'NotFound' || err.$metadata?.httpStatusCode === 404) {
      return false; // nie ma pliku
    }
    throw err; // inny błąd - wyrzuć
  }
}

// Retry z delayem
async function uploadWithRetry(s3, bucket, key, filePath, maxRetries = 3) {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      const fileStream = fs.createReadStream(filePath);
      await s3.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: fileStream,
        }),
      );
      return; // sukces
    } catch (err) {
      attempt++;
      console.warn(`⚠️ Upload próba ${attempt} nie powiodła się dla ${key}: ${err.message}`);
      if (attempt >= maxRetries) throw err;
      const delayMs = attempt * 2000; // np. 2s, 4s, 6s
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
}

// Funkcja logująca błędy do pliku migration_errors.txt
function logErrorToFile(message) {
  const logPath = path.join(process.cwd(), 'migration_errors.txt');
  const timestamp = new Date().toISOString();
  const fullMessage = `[${timestamp}] ${message}\n`;
  fs.appendFile(logPath, fullMessage, (err) => {
    if (err) console.error('Nie udało się zapisać logu błędu:', err);
  });
}

// Migracja rekurencyjna folderu
async function migrateFolder(drive, s3, bucket, folderId, prefix = '') {
  const items = await listDriveFiles(drive, folderId);
  let migrated = [];

  for (const item of items) {
    if (item.mimeType === 'application/vnd.google-apps.folder') {
      const newPrefix = `${prefix}${item.name}/`;
      console.log(`📁 Przechodzę do folderu: ${newPrefix}`);
      const subResults = await migrateFolder(drive, s3, bucket, item.id, newPrefix);
      migrated = migrated.concat(subResults);
    } else {
      const fileKey = `${prefix}${item.name}`;
      // console.log(`📄 Migracja pliku: ${fileKey}`);

      try {
        const exists = await fileExists(s3, bucket, fileKey);
        if (exists) {
          // console.log(`✔️ Plik ${fileKey} już istnieje w B2 - pomijam`);
          migrated.push({ name: item.name, key: fileKey, skipped: true });
          continue;
        }

        const tempFilePath = path.join(os.tmpdir(), `migrate_${Date.now()}_${item.name}`);

        await downloadFile(drive, item.id, tempFilePath);
        await uploadWithRetry(s3, bucket, fileKey, tempFilePath);
        fs.unlinkSync(tempFilePath);

        migrated.push({ name: item.name, key: fileKey });
      } catch (err) {
        const errMsg = `Błąd migracji pliku ${item.name}: ${err.message}`;
        console.error(`❌ ${errMsg}`);
        logErrorToFile(errMsg);
      }
    }
  }

  return migrated;
}

(async () => {
  try {
    const drive = getDriveClient();
    const s3 = getB2Client();
    const bucket = process.env.B2_BUCKET;

    const rootFolderIds = process.env.GDRIVE_FOLDER_IDS
      ? process.env.GDRIVE_FOLDER_IDS.split(',').map((f) => f.trim())
      : [];

    if (rootFolderIds.length === 0) {
      console.error('Brak folderów do migracji. Ustaw zmienną GDRIVE_FOLDER_IDS w .env');
      process.exit(1);
    }

    for (const folderId of rootFolderIds) {
      const rootFolderName = await getFolderName(drive, folderId);
      const rootPrefix = `${rootFolderName}/`;

      console.log(`\n🔁 Migracja folderu [${rootFolderName}] o ID: ${folderId}`);
      const results = await migrateFolder(drive, s3, bucket, folderId, rootPrefix);
      console.log(`🎉 Pomyślnie zmigrowano ${results.length} plików z folderu ${rootFolderName}`);
    }
  } catch (err) {
    console.error('Błąd migracji:', err);
    process.exit(1);
  }
})();
