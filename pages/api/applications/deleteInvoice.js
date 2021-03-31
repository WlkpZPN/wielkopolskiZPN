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
    const { key, clubId } = req.body;
    console.log(req.body);
    const params = {
      Bucket: "pdf/faktury",
      Key: key,
    };
    s3.deleteObject(params, function (err, data) {
      if (err) console.log(err, err.stack);
      else console.log(data);
    });

    await prisma.clubs.update({
      where: {
        id: parseInt(clubId),
      },
      data: {
        invoice_url: null,
      },
    });
  });
};
