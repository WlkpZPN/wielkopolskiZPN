import { google } from 'googleapis';
import mime from 'mime-types';
import { PassThrough } from 'stream';
import { Client } from 'basic-ftp';
import { tmpdir } from 'os';
import { join } from 'path';
import fs from 'fs';

export const config = {
    api: {
        responseLimit: false,
    },
};

const ALLOWED_MIME_TYPES = [
    /^text\//,
    /^image\//,
    /^audio\//,
    /^video\//,
    /^application\/pdf$/,
];

function getDriveClient() {
    const credentials = JSON.parse(process.env.GDRIVE_CREDENTIALS);

    // 🔁 Zamień literalne \\n na prawdziwe \n
    credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');

    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    return google.drive({ version: 'v3', auth });
}

async function findFileInFolder(drive, fileName, folderId) {
    const query = `'${folderId}' in parents and name = '${fileName}' and trashed = false`;
    const res = await drive.files.list({
        q: query,
        fields: 'files(id, name, mimeType)',
    });

    return res.data.files[0] || null;
}

export default async function handler(req, res) {
    const rawPath = decodeURIComponent(req.query.path || '');
    if (!rawPath) return res.status(400).json({ error: 'Missing file path' });

    const pathParts = rawPath.split('/').filter(Boolean);
    if (pathParts.length !== 2) {
        return res.status(400).json({ error: 'Path must be in format /prefix/filename.ext' });
    }

    const [prefix, fileName] = pathParts;

    let rootFolderId;
    if (prefix === 'wnioski') {
        rootFolderId = process.env.GDRIVE_FOLDER_ID_WNIOSKI;
    } else if (prefix === 'faktura') {
        rootFolderId = process.env.GDRIVE_FOLDER_ID_FAKTURY;
    } else {
        return res.status(400).json({ error: `Unknown folder prefix: ${prefix}` });
    }

    if (!rootFolderId) {
        return res.status(500).json({ error: `Missing root folder ID for: ${prefix}` });
    }

    const drive = getDriveClient();

    try {
        const file = await findFileInFolder(drive, fileName, rootFolderId);

        if (file) {
            const mimeType = mime.lookup(file.name) || file.mimeType || 'application/octet-stream';
            const isAllowed = ALLOWED_MIME_TYPES.some((pattern) => pattern.test(mimeType));

            if (!isAllowed) {
                return res.status(403).json({ error: `Preview not allowed for this file type (${mimeType})` });
            }

            const streamRes = await drive.files.get(
                { fileId: file.id, alt: 'media' },
                { responseType: 'stream' }
            );

            res.setHeader('Content-Type', mimeType);
            const encodedName = encodeURIComponent(file.name);
            res.setHeader('Content-Disposition', `inline; filename*=UTF-8''${encodedName}`);

            const passthrough = new PassThrough();
            streamRes.data.pipe(passthrough).pipe(res);
            return;
        }

        // Fallback: check FTP
        const ftpClient = new Client(30000);
        try {
            await ftpClient.access({
                host: process.env.SFTP_HOST,
                port: parseInt(process.env.SFTP_PORT || '21', 10),
                user: process.env.SFTP_USERNAME,
                password: process.env.SFTP_PASSWORD,
                secure: false,
            });

            const list = await ftpClient.list(`/${prefix}`);
            const found = list.find((f) => f.name === fileName);
            if (!found) {
                return res.status(404).json({ error: 'File not found on Drive or FTP' });
            }

            const mimeType = mime.lookup(fileName) || 'application/octet-stream';
            const isAllowed = ALLOWED_MIME_TYPES.some((pattern) => pattern.test(mimeType));

            if (!isAllowed) {
                return res.status(403).json({ error: `Preview not allowed for this file type (${mimeType})` });
            }

            const tempPath = join(tmpdir(), `${Date.now()}_${fileName}`);
            await ftpClient.downloadTo(tempPath, `/${prefix}/${fileName}`);

            res.setHeader('Content-Type', mimeType);
            res.setHeader('Content-Disposition', `inline; filename*=UTF-8''${encodeURIComponent(fileName)}`);

            const fileStream = fs.createReadStream(tempPath);
            fileStream.pipe(res);
            fileStream.on('end', () => fs.unlink(tempPath, () => {}));
        } catch (ftpErr) {
            console.error('FTP fallback failed:', ftpErr);
            return res.status(500).json({ error: 'Error retrieving file from FTP' });
        } finally {
            ftpClient.close();
        }
    } catch (err) {
        console.error('Drive View Error:', err);
        res.status(500).json({ error: 'Failed to preview file', details: err.message });
    }
}
