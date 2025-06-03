// pages/api/applications/uploadFiles.ts

import { IncomingForm } from 'formidable';
import fs from 'fs';
import aws from 'aws-sdk';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Upewnij się, że ENV są ustawione
if (!process.env.DB_SPACES_ENDPOINT || !process.env.DB_SPACES_KEY || !process.env.DB_SPACES_SECRET) {
  throw new Error("Missing required environment variables for S3/Spaces");
}

const spacesEndpoint = new aws.Endpoint(process.env.DB_SPACES_ENDPOINT);
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.DB_SPACES_KEY,
    secretAccessKey: process.env.DB_SPACES_SECRET,
  }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const form = new IncomingForm({ multiples: false, keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parse error:", err);
      return res.status(500).json({ error: 'Error parsing form data' });
    }

    const file = files.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upewnij się że ścieżka i nazwa pliku są dostępne
    const filePath = Array.isArray(file) ? file[0].filepath : file.filepath;
    const fileName = Array.isArray(file) ? file[0].originalFilename : file.originalFilename;
    const fileStream = fs.createReadStream(filePath);

    try {
      const uploadResult = await s3
          .upload({
            Bucket: 'pdf/wnioski',
            Key: `pdf/wnioski/${fileName}`,
            Body: fileStream,
            ACL: 'public-read',
            ContentType: file.mimetype || 'application/octet-stream',
          })
          .promise();

      return res.status(200).json({ message: 'File uploaded', url: uploadResult.Location , result: uploadResult});
    } catch (uploadErr) {
      console.error("S3 upload error:", uploadErr);
      return res.status(500).json({ error: 'Failed to upload to S3' });
    }
  });
}
