import {google} from 'googleapis';
import multiparty from 'multiparty';
import fs from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyParser: false,
    },
};

function parseForm(req) {
    return new Promise((resolve, reject) => {
        const form = new multiparty.Form();
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            else resolve({fields, files});
        });
    });
}

function getDriveClient() {
    const credentials = JSON.parse(process.env.GDRIVE_CREDENTIALS);
    credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');

    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/drive'],
    });

    return google.drive({version: 'v3', auth});
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({error: 'Method Not Allowed'});
    }

    try {
        const {fields, files} = await parseForm(req);
        const uploadedFiles = files.files || [];
        // const targetDir2 = process.env.GDRIVE_FOLDER_ID;
        // const targetDir = fields.targetDir;

        // console.log(fields);
        // console.log(targetDir2);
        console.log('targetDir: ', fields.targetDir[0]);

        let targetDir;
        if (fields.targetDir[0] === '/wnioski') {
            targetDir = process.env.GDRIVE_FOLDER_ID_WNIOSKI;
        } else if (fields.targetDir[0] === '/faktura') {
            targetDir = process.env.GDRIVE_FOLDER_ID_FAKTURY;
        } else if (fields.targetDir[0] === '/faktury') {
            targetDir = process.env.GDRIVE_FOLDER_ID_FAKTURY;
        } else {
            // return res.status(400).json({ error: 'Unknown root folder for path prefix: ' + firstSegment });
        }


        if (!targetDir) {
            return res.status(500).json({error: 'Missing GDRIVE_FOLDER_ID'});
        }

        const drive = getDriveClient();
        const results = [];

        for (const file of uploadedFiles) {
            const filePath = file.path || file.filepath; // obsługuje obie wersje
            const fileName = file.originalFilename;

            try {
                const upload = await drive.files.create({
                    requestBody: {
                        name: fileName,
                        parents: [targetDir],
                    },
                    media: {
                        mimeType: file.mimetype,
                        body: fs.createReadStream(filePath),
                    },
                    fields: 'id, webViewLink',
                });

                results.push({
                    name: fileName,
                    id: upload.data.id,
                    link: upload.data.webViewLink,
                });

                await new Promise((r) => setTimeout(r, 200)); // delikatna przerwa
            } catch (err) {
                console.error(`Upload failed for ${fileName}:`, err.message);
                results.push({name: fileName, error: err.message});
            }
        }

        res.status(200).json({
            message: 'Upload successful',
            results,
        });

    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({error: 'Upload failed', details: err.message});
    }
}
