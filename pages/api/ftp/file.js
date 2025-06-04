import {Client} from 'basic-ftp';
import { Readable, PassThrough } from 'stream';

export default async function handler(req, res) {
    const { path } = req.query;
    const client = new Client();

    try {
        await client.access({
            host: process.env.SFTP_HOST,
            port: parseInt(process.env.SFTP_PORT || '21', 10),
            user: process.env.SFTP_USERNAME,
            password: process.env.SFTP_PASSWORD,
            secure: false,
        });

        if (req.method === 'GET') {
            const chunks = [];
            const stream = new PassThrough();

            stream.on('data', (chunk) => chunks.push(chunk));
            stream.on('end', () => {
                const content = Buffer.concat(chunks).toString('utf8');
                res.status(200).json({ content });
            });

            await client.downloadTo(stream, path);
        } else if (req.method === 'PUT') {
            const { content } = req.body;

            if (typeof content !== 'string') {
                return res.status(400).json({ error: 'Invalid content format' });
            }

            const buffer = Buffer.from(content, 'utf8');
            const stream = Readable.from(buffer); // ✅ KONIECZNE

            await client.uploadFrom(stream, path);

            res.status(200).json({ message: 'File saved' });
        } else {
            res.status(405).end();
        }

    } catch (err) {
        console.error('FTP File Error:', err);
        res.status(500).json({ error: 'File operation failed' });
    } finally {
        client.close();
    }
}
