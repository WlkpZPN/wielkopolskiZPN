import prisma from "../../../middleware/prisma";
import aws from "aws-sdk";

const spacesEndpoint = new aws.Endpoint(process.env.DB_SPACES_ENDPOINT);
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DB_SPACES_KEY,
  secretAccessKey: process.env.DB_SPACES_SECRET,
});
export default (req, res) => {
  console.log(req.data);
  return new Promise(async (resolve) => {
    const { clubID, applicationID, clubData } = req.body;
    const sport_facilities = clubData.applications[0].sport_facilities;

    try {
      // 1. delete all histories
      await prisma.histories.deleteMany({
        where: {
          application_id: parseInt(applicationID),
        },
      });

      // 2. delete sport facilities


      // await prisma.sport_facilities.deleteMany({
      //   where: {
      //     application_id: parseInt(applicationID),
      //   },
      // });
      // 3. delete application

      await prisma.applications.update({
        where: {
          id: parseInt(applicationID),

        },
        data: {
          status_id: 1,
        }
      });
      // 4.delete files TO DO LATER
      //TODO: delete files from bucket

      // delete all files from server
      sport_facilities.forEach((facility) => {
        facility.applications_attachments.forEach(async (attachment) => {
          const params = {
            Bucket: "pdf/wnioski",
            Key: attachment.name,
          };
          s3.deleteObject(params, function (err, data) {
            if (err) console.log(err, err.stack);
            else console.log(data);
          });
        });
      });

      clubData.applications[0].applications_attachments.forEach(
        (attachment) => {
          const params = {
            Bucket: "pdf/wnioski",
            Key: attachment.name,
          };
          s3.deleteObject(params, function (err, data) {
            if (err) console.log(err, err.stack);
            else console.log(data);
          });
        }
      );

      // delete attachments from database

      await prisma.applications_attachments.deleteMany({
        where: {
          application_id: parseInt(applicationID),
        },
      });

      sport_facilities.forEach(async (facility) => {
        await prisma.applications_attachments.deleteMany({
          where: {
            sport_facilities_id: facility.id,
          },
        });
      });

      res.send("Application deleted");

      // const allFiles = await prisma.applications_attachments.findMany({
      //   where: {
      //     OR: [
      //       {
      //         application_id: applicationID,
      //       },
      //     ],
      //   },
      // });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  });
};
