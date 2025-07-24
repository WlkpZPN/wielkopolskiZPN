import multiparty from 'multiparty';
import fs from 'fs';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import mime from 'mime-types';

export const config = {
    api: {
        bodyParser: false,
    },
};

function parseForm(req) {
    return new Promise((resolve, reject) => {
        const form = new multiparty.Form();
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            else resolve({ fields, files });
        });
    });
}

function getB2Client() {
    return new S3Client({
        region: 'auto',
        endpoint: process.env.B2_ENDPOINT,
        credentials: {
            accessKeyId: process.env.B2_KEY_ID,
            secretAccessKey: process.env.B2_KEY,
        },
    });
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { fields, files } = await parseForm(req);
        const uploadedFiles = files.files || [];

        let targetPrefix = '';
        if (fields.targetDir?.[0] === '/wnioski') {
            targetPrefix = 'wnioski/';
        } else if (fields.targetDir?.[0] === '/faktura' || fields.targetDir?.[0] === '/faktury') {
            targetPrefix = 'faktury/';
        }

        const s3 = getB2Client();
        const bucket = process.env.B2_BUCKET;
        const results = [];

        for (const file of uploadedFiles) {
            const filePath = file.path || file.filepath;
            const fileName = file.originalFilename;
            const mimeType = mime.lookup(fileName) || 'application/octet-stream';
            const key = `${targetPrefix}${Date.now()}-${fileName}`;

            try {
                const fileBuffer = fs.readFileSync(filePath);

                const putCommand = new PutObjectCommand({
                    Bucket: bucket,
                    Key: key,
                    Body: fileBuffer,
                    ContentType: mimeType,
                });

                await s3.send(putCommand);

                results.push({
                    name: fileName,
                    key, // ← potrzebne później do pobierania
                    uploaded: true,
                });
            } catch (err) {
                console.error(`Upload failed for ${fileName}:`, err.message);
                results.push({ name: fileName, error: err.message });
            }
        }

        res.status(200).json({
            message: 'Upload successful',
            results,
        });

    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ error: 'Upload failed', details: err.message });
    }
}
