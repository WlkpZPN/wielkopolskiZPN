import {Client} from 'basic-ftp';
import mime from 'mime-types';
import { tmpdir } from 'os';
import { join } from 'path';
import { createReadStream, unlink } from 'fs';

export const config = {
    api: { responseLimit: false },
};

const ALLOWED_MIME_TYPES = [
    /^text\//,
    /^image\//,
    /^audio\//,
    /^video\//,
    /^application\/pdf$/,
];

export default async function handler(req, res) {
    const rawPath = req.query.path;
    const path = decodeURIComponent(rawPath || "");

    if (!path) {
        return res.status(400).json({ error: 'Missing file path' });
    }

    const client = new Client(60000);
    client.ftp.verbose = false;

    try {
        await client.access({
            host: process.env.SFTP_HOST,
            port: parseInt(process.env.SFTP_PORT || '21', 10),
            user: process.env.SFTP_USERNAME,
            password: process.env.SFTP_PASSWORD,
            secure: false,
        });

        const dir = path.substring(0, path.lastIndexOf('/')) || '/';
        const fileName = path.split('/').pop();

        await client.cd(dir);
        const list = await client.list();
        const found = list.find((f) => f.name === fileName);

        if (!found) {
            return res.status(404).json({ error: 'File not found on FTP' });
        }
        if (found.type === 2) {
            return res.status(400).json({ error: 'Cannot preview directories' });
        }

        const mimeType = mime.lookup(fileName) || 'application/octet-stream';
        const isAllowed = ALLOWED_MIME_TYPES.some((pattern) => pattern.test(mimeType));

        if (!isAllowed) {
            return res.status(403).json({ error: `Preview not allowed for this file type (${mimeType})` });
        }

        const tempPath = join(tmpdir(), `${Date.now()}_${fileName}`);
        await client.downloadTo(tempPath, fileName);

        res.setHeader('Content-Type', mimeType);
        // res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);
        const encodedFileName = encodeURIComponent(fileName);
        res.setHeader('Content-Disposition', `inline; filename*=UTF-8''${encodedFileName}`);

        const fileStream = createReadStream(tempPath);
        fileStream.pipe(res);
        fileStream.on('end', () => unlink(tempPath, () => {}));
    } catch (err) {
        console.error('FTP View Error:', err);
        res.status(500).json({ error: 'Failed to stream file for preview' });
    } finally {
        client.close();
    }
}
