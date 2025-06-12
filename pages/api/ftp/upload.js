import { Client } from "basic-ftp";
import multiparty from "multiparty";
import fs from "fs";
import path from "path";

export const config = {
    api: {
        bodyParser: false,
    },
};

import { config as dotenvConfig } from "dotenv";
dotenvConfig();

function parseForm(req) {
    return new Promise((resolve, reject) => {
        const form = new multiparty.Form();
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            else resolve({ fields, files });
        });
    });
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const client = new Client(30000); // 30s timeout

    try {
        const { fields, files } = await parseForm(req);
        const uploadedFiles = files.files || [];

        const targetDirRaw = fields.targetDir?.[0] || "/uploads";
        const targetDir = path.posix.normalize(targetDirRaw.replace(/\\/g, "/"));

        client.ftp.verbose = false;

        await client.access({
            host: process.env.SFTP_HOST,
            port: 21,
            user: process.env.SFTP_USERNAME,
            password: process.env.SFTP_PASSWORD,
            secure: false, // home.pl: zwykłe FTP, brak TLS domyślnie
        });

        for (const file of uploadedFiles) {
            const sourcePath = file.path;
            const destinationPath = path.posix.join(targetDir, file.originalFilename);

            console.log(`Uploading: ${destinationPath}`);
            try {
                await client.uploadFrom(sourcePath, destinationPath);
            } catch (uploadErr) {
                console.error(`Upload failed for ${file.originalFilename}:`, uploadErr.message);
                throw uploadErr;
            }

            // Delikatna przerwa między uploadami (home.pl bywa wrażliwy)
            await new Promise((res) => setTimeout(res, 200));
        }

        res.status(200).json({ message: "Upload successful" });

    } catch (err) {
        console.error("Upload error:", err);
        res.status(500).json({ error: "Upload failed", details: err.message });

    } finally {
        try {
            await client.close(); // zamknięcie połączenia obowiązkowe!
        } catch (closeErr) {
            console.warn("Error closing FTP connection:", closeErr.message);
        }
    }
}
