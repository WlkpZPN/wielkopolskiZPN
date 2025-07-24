import {S3} from 'aws-sdk';
import mime from 'mime-types';
import {PassThrough} from 'stream';

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

const s3 = new S3({
    accessKeyId: process.env.B2_KEY_ID,
    secretAccessKey: process.env.B2_KEY,
    endpoint: process.env.B2_ENDPOINT,
    region: 'auto',
    signatureVersion: 'v4',
});

export default async function handler(req, res) {
    const rawPath = decodeURIComponent(req.query.path || '');
    if (!rawPath) return res.status(400).json({error: 'Missing file path'});

    const pathParts = rawPath.split('/').filter(Boolean);

    if (pathParts.length !== 2) {
        return res.status(400).json({error: 'Path must be in format /prefix/filename.ext'});
    }

    const [prefix, fileName] = pathParts;
    const key = `${prefix}/${fileName}`;

    const mimeType = mime.lookup(fileName) || 'application/octet-stream';
    const isAllowed = ALLOWED_MIME_TYPES.some((pattern) => pattern.test(mimeType));

    if (!isAllowed) {
        return res.status(403).json({error: `Preview not allowed for this file type (${mimeType})`});
    }

    try {
        const pass = new PassThrough();

        const stream = s3
            .getObject({
                Bucket: process.env.B2_BUCKET,
                Key: key,
            })
            .createReadStream();

        stream.on('error', (err) => {
            console.error('B2 Stream error:', err);
            res.status(404).json({error: 'File not found in B2'});
        });

        res.setHeader('Content-Type', mimeType);
        res.setHeader('Content-Disposition', `inline; filename*=UTF-8''${encodeURIComponent(fileName)}`);

        stream.pipe(pass).pipe(res);
    } catch (err) {
        console.error('B2 download error:', err);
        res.status(500).json({error: 'Failed to download from B2', details: err.message});
    }
}
