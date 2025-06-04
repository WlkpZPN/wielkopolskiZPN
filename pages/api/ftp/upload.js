// pages/api/ftp/upload.js
import {Client} from 'basic-ftp';
import { Buffer } from 'buffer';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { filename, content } = req.body;
    const client = new Client();

    try {
        await client.access({
            host: process.env.SFTP_HOST,
            port: parseInt(process.env.SFTP_PORT),
            user: process.env.SFTP_USERNAME,
            password: process.env.SFTP_PASSWORD,
            secure: false,
        });

        const buffer = Buffer.from(content, 'base64');
        await client.uploadFrom(buffer, filename);

        res.status(200).json({ message: 'File uploaded successfully' });
    } catch (err) {
        console.error('FTP Upload Error:', err);
        res.status(500).json({ error: 'Upload failed' });
    } finally {
        client.close();
    }
}
