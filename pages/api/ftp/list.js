import ftp from 'basic-ftp';
import { Client } from 'basic-ftp';

export default async function handler(req, res) {
  const path = req.query.path || '/';
  // const client = new ftp.Client(10000);
  const client = new Client();
  client.ftp.verbose = false;

  try {
    await client.access({
      host: process.env.SFTP_HOST,
      port: parseInt(process.env.SFTP_PORT),
      user: process.env.SFTP_USERNAME,
      password: process.env.SFTP_PASSWORD,
      secure: false,
    });

    await client.cd(path);
    const list = await client.list();
    console.log(list);
    res.status(200).json({ files: list, path });
  } catch (err) {
    console.error('FTP Error:', err);
    res.status(500).json({ error: 'FTP list failed' });
  } finally {
    client.close();
  }
}
