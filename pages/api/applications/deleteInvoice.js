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
    const { key, applicationID, index } = req.body;

    const params = {
      Bucket: "pdf/faktury",
      Key: key,
    };
    try {
    } catch (e) {
      res.status(400);
      console.log(e);
      res.json({
        status: "error",
        message: e,
      });
    }
    s3.deleteObject(params, function (err, data) {
      if (err) console.log(err, err.stack);
      else {
        console.log(data);
      }
    });

    if (index == "second") {
      await prisma.applications.update({
        where: {
          id: parseInt(applicationID),
        },
        data: {
          invoice_url_2: null,
        },
      });
      res.status(200);
      res.send("faktura usunieta");
      return resolve();
    }

    if (index == "first") {
      await prisma.applications.update({
        where: {
          id: parseInt(applicationID),
        },
        data: {
          invoice_url: null,
        },
      });

      res.status(200);
      res.send("faktura usunieta");
      return resolve();
    }
    res.status(400);
    res.send("nieznany index");
    return resolve();
  });
};
