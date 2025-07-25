import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import prisma from '../../../middleware/prisma';

const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.B2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.B2_KEY_ID,
    secretAccessKey: process.env.B2_KEY,
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { key, applicationID, index } = req.body;

  if (!key || !applicationID || !index) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: process.env.B2_BUCKET,
      Key: key,
    });

    await s3.send(deleteCommand);

    if (index === 'first') {
      await prisma.applications.update({
        where: { id: parseInt(applicationID, 10) },
        data: { invoice_url: null },
      });
    } else if (index === 'second') {
      await prisma.applications.update({
        where: { id: parseInt(applicationID, 10) },
        data: { invoice_url_2: null },
      });
    } else {
      res.status(400).json({ error: 'Unknown index value' });
      return;
    }

    res.status(200).json({ message: 'File deleted and database updated' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Failed to delete file', details: err.message });
  }
}
