import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import prisma from "../../../middleware/prisma";

const spacesEndpoint = new aws.Endpoint(process.env.DB_SPACES_ENDPOINT);
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DB_SPACES_KEY,
  secretAccessKey: process.env.DB_SPACES_SECRET,
});

//apiRoute.use(upload.single("invoice"));

export default (req, res) => {
  return new Promise(async (resolve) => {
    const { attachment, facilityID } = req.body;
    let attachmentID = attachment.id;
    console.log("attachment", attachment);
    const params = {
      Bucket: "pdf/wnioski",
      Key: attachment.name,
    };
    s3.deleteObject(params, function (err, data) {
      if (err) console.log(err, err.stack);
      else console.log(data);
    });
    if (parseInt(attachment.id) !== NaN) {
      attachmentID = parseInt(attachmentID);
    }
    await prisma.applications_attachments.delete({
      where: {
        id: parseInt(attachment.id),
      },
    });

    const attachments = await prisma.applications_attachments.findMany({
      where: {
        sport_facilities_id: parseInt(facilityID),
      },
    });

    res.json({
      attachments,
    });
  });
};
