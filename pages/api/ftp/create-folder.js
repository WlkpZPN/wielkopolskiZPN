// pages/api/ftp/create-folder.js
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

        await client.ensureDir(path);
        res.status(200).json({ message: 'Folder created' });
    } catch (err) {
        console.error('FTP Create Folder Error:', err);
        res.status(500).json({ error: 'Failed to create folder' });
    } finally {
        client.close();
    }
}
