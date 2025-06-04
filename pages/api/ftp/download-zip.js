// pages/api/ftp/download-zip.js
import {Client} from 'basic-ftp';
import archiver from 'archiver';
import { PassThrough } from 'stream';

export const config = {
    api: { responseLimit: false }, // aby umożliwić przesyłanie dużych plików
};

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { files } = req.body;
    const client = new Client(30000);
    client.ftp.verbose = false;

    try {
        await client.access({
            host: process.env.SFTP_HOST,
            port: parseInt(process.env.SFTP_PORT),
            user: process.env.SFTP_USERNAME,
            password: process.env.SFTP_PASSWORD,
            secure: false,
        });

        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', 'attachment; filename=files.zip');

        const archive = archiver('zip', { zlib: { level: 9 } });
        archive.pipe(res);

        for (const filePath of files) {
            const passthrough = new PassThrough();
            const filename = filePath.split('/').pop();

            // Pipe FTP download into archive
            client.downloadTo(passthrough, filePath).catch((err) => {
                console.error(`Błąd przy pobieraniu ${filePath}:`, err);
                archive.append(`Błąd przy pobieraniu ${filePath}`, { name: `${filename}.error.txt` });
            });

            archive.append(passthrough, { name: filename });
        }

        archive.finalize();
    } catch (err) {
        console.error('ZIP FTP Error:', err);
        res.status(500).json({ error: 'ZIP download failed' });
    } finally {
        client.close();
    }
}
