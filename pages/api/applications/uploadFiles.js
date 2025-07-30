// pages/api/applications/uploadFiles.ts

import { IncomingForm } from 'formidable'; // To parse multi-part form data
import fs from 'fs'; // For file stream reading
import SFTPClient from 'ssh2-sftp-client'; // Library for SFTP
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const SFTP_CONFIG = {
  host: process.env.SFTP_HOST,
  port: Number(process.env.SFTP_PORT || 22),
  username: process.env.SFTP_USERNAME,
  password: process.env.SFTP_PASSWORD,
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const form = new IncomingForm({ multiples: false, keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err);
      return res.status(500).json({ error: 'Error parsing form data' });
    }

    const file = files.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Extract file details
    const filePath = Array.isArray(file) ? file[0].filepath : file.filepath;
    const fileName = Array.isArray(file) ? file[0].originalFilename : file.originalFilename;

    // Initialize SFTP client
    const sftp = new SFTPClient();

    try {
      // Connect to the SFTP server
      await sftp.connect(SFTP_CONFIG);
      console.log('Connected to SFTP server.');

      // Ensure the target directory exists
      const targetDirectory = '/pdf/wnioski'; // Change to the desired SFTP directory
      const targetPath = path.join(targetDirectory, fileName);

      // Create directories if needed and upload the file
      await sftp.mkdir(targetDirectory, true); // Creates parent directories if they don't exist
      await sftp.put(filePath, targetPath); // Uploads the file to the designated directory

      // Generate a result URL (depends on SFTP server configuration)
      const resultUrl = `sftp://${SFTP_CONFIG.host}${targetPath}`;

      return res.status(200).json({
        message: 'File uploaded successfully',
        url: resultUrl,
      });
    } catch (sftpErr) {
      console.error('SFTP upload error:', sftpErr);
      return res.status(500).json({ error: 'Failed to upload to the SFTP server' });
    } finally {
      // Always close the SFTP connection
      await sftp.end();
    }
  });
}
