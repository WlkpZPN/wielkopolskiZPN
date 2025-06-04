import {Client} from 'basic-ftp';
import mime from 'mime-types';
import { PassThrough } from 'stream';

export const config = {
    api: { responseLimit: false },
};

// Lista MIME typów bezpiecznych do wyświetlania w przeglądarce
const ALLOWED_MIME_TYPES = [
    /^text\//,               // text/plain, text/html, etc.
    /^image\//,              // image/png, image/jpeg, etc.
    /^audio\//,              // audio/mpeg, etc. (opcjonalnie)
    /^video\//,              // video/mp4, etc. (opcjonalnie)
    /^application\/pdf$/,    // PDF
];

export default async function handler(req, res) {
    const { path } = req.query;

    if (!path) {
        return res.status(400).json({ error: 'Missing file path' });
    }

    const client = new Client();

    try {
        await client.access({
            host: process.env.SFTP_HOST,
            port: parseInt(process.env.SFTP_PORT || '21', 10),
            user: process.env.SFTP_USERNAME,
            password: process.env.SFTP_PASSWORD,
            secure: false,
        });

        const mimeType = mime.lookup(path) || '';
        const isAllowed = ALLOWED_MIME_TYPES.some((pattern) => pattern.test(mimeType));

        if (!isAllowed) {
            return res.status(403).json({ error: `Preview not allowed for this file type (${mimeType || 'unknown'})` });
        }

        const stream = new PassThrough();
        res.setHeader('Content-Type', mimeType);
        res.setHeader('Content-Disposition', `inline; filename="${decodeURIComponent(path.split('/').pop())}"`);

        await client.downloadTo(stream, path);
        stream.pipe(res);
    } catch (err) {
        console.error('FTP View Error:', err);
        res.status(500).json({ error: 'Failed to stream file for preview' });
    } finally {
        client.close();
    }
}
