// pages/api/files/upload.js
import {Client} from "basic-ftp";
import multiparty from "multiparty";
import fs from "fs";
import path from "path";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const form = new multiparty.Form();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error("Form parse error:", err);
            return res.status(400).json({ error: "Failed to parse form" });
        }

        const uploadedFiles = files.files || [];
        const targetDir = (fields.targetDir?.[0] || "/uploads").replace(/\\/g, "/");


        const client = new Client(60000);
        try {
            await client.access({
                host: process.env.SFTP_HOST,
                port: parseInt(process.env.SFTP_PORT || "21", 10),
                user: process.env.SFTP_USERNAME,
                password: process.env.SFTP_PASSWORD,
                secure: false,
            });

            for (const file of uploadedFiles) {
                const stream = fs.createReadStream(file.path);
                const destinationPath = path.posix.join(targetDir, file.originalFilename);
                await client.uploadFrom(stream, destinationPath);
            }

            res.status(200).json({ message: "Upload successful" });
        } catch (e) {
            console.error("FTP Upload Error:", e);
            res.status(500).json({ error: "Upload failed" });
        } finally {
            client.close();
        }
    });
}
