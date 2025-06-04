// pages/api/ftp/delete-folder.js
import {Client} from 'basic-ftp';

export default async function handler(req, res) {
    if (req.method !== 'DELETE') return res.status(405).end();

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

        await client.cd(path);
        const contents = await client.list();

        if (contents.length > 0) {
            return res.status(400).json({ error: 'Folder is not empty' });
        }

        await client.removeDir(path);
        res.status(200).json({ message: 'Folder deleted' });
    } catch (err) {
        console.error('FTP Delete Folder Error:', err);
        res.status(500).json({ error: 'Failed to delete folder' });
    } finally {
        client.close();
    }
}
