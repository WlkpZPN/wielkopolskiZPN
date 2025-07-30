import SFTPClient from 'ssh2-sftp-client';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Only DELETE method allowed' });
  }

  const sftp = new SFTPClient();
  const { filename } = req.body;

  try {
    await sftp.connect({
      host: process.env.SFTP_HOST,
      port: parseInt(process.env.SFTP_PORT),
      username: process.env.SFTP_USERNAME,
      password: process.env.SFTP_PASSWORD,
    });

    await sftp.delete(`/${filename}`);
    await sftp.end();

    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('SFTP Error:', error);
    res.status(500).json({ error: 'Delete failed' });
  }
}
