// pages/api/ftp/download.js
import {Client} from 'basic-ftp';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { path } = req.body;
    const client = new Client();

    try {
        await client.access({
            host: process.env.SFTP_HOST,
            port: parseInt(process.env.SFTP_PORT),
            user: process.env.SFTP_USERNAME,
            password: process.env.SFTP_PASSWORD,
            secure: false,
        });

        const fileName = path.split('/').pop();
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        await client.downloadTo(res, path);
    } catch (err) {
        console.error('FTP Download Error:', err);
        res.status(500).json({ error: 'Download failed' });
    } finally {
        client.close();
    }
}
