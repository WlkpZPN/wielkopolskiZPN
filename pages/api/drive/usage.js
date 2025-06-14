import { google } from 'googleapis';

export default async function handler(req, res) {
    try {
        const creds = JSON.parse(process.env.GDRIVE_CREDENTIALS);
        creds.private_key = creds.private_key.replace(/\\n/g, '\n');

        const auth = new google.auth.GoogleAuth({
            credentials: creds,
            scopes: ['https://www.googleapis.com/auth/drive.metadata.readonly'],
        });

        const drive = google.drive({ version: 'v3', auth });
        const about = await drive.about.get({ fields: 'storageQuota' });
        const quota = about.data.storageQuota;

        const bytesToGB = (bytes) => Number(bytes) / 1024 / 1024 / 1024;

        const used = bytesToGB(quota.usage);
        const limit = bytesToGB(quota.limit);
        const usedInDrive = bytesToGB(quota.usageInDrive);
        const usedInTrash = bytesToGB(quota.usageInDriveTrash);

        const percentUsed =
            quota.limit === '0' ? null : ((used / limit) * 100).toFixed(2);

        res.status(200).json({
            limit: quota.limit === '0' ? 'Unlimited' : `${limit.toFixed(2)} GB`,
            used: `${used.toFixed(2)} GB`,
            usedInDrive: `${usedInDrive.toFixed(2)} GB`,
            usedInTrash: `${usedInTrash.toFixed(2)} GB`,
            percentUsed: percentUsed !== null ? `${percentUsed}%` : 'N/A',
        });
    } catch (err) {
        console.error('Usage check failed:', err);
        res.status(500).json({
            error: 'Unable to retrieve storage quota',
            details: err.message,
        });
    }
}
