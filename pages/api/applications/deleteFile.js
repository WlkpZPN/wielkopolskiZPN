import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import prisma from "../../../middleware/prisma";
import {DeleteObjectCommand, S3Client} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.B2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.B2_KEY_ID,
    secretAccessKey: process.env.B2_KEY,
  },
});

//apiRoute.use(upload.single("invoice"));

export default (req, res) => {
  return new Promise(async (resolve) => {
    const { attachment } = req.body;

    let attachmentID = attachment.id;
    console.log("attachment", attachment);

    const deleteCommand = new DeleteObjectCommand({
      Bucket: process.env.B2_BUCKET,
      Key: attachment.filepath.substring(1),
    });

    await s3.send(deleteCommand);

    if (parseInt(attachment.id) !== NaN) {
      attachmentID = parseInt(attachmentID);
    }
    await prisma.applications_attachments.delete({
      where: {
        id: parseInt(attachment.id),
      },
    });

    res.send("file deleted");
  });
};
