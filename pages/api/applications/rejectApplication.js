import prisma from "../../../middleware/prisma";
import { getCurrentDate } from "../../../middleware/utils";
export default async (req, res) => {
  return new Promise(async (resolve) => {
    const { applicationID, reason } = req.body;
    try {
      await prisma.applications.update({
        where: {
          id: applicationID,
        },
        data: {
          status_id: 5,
          reject_reason: reason,
        },
      });

      await prisma.histories.create({
        data: {
          application_id: applicationID,
          description: reason,
          status_id: 5,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
      return resolve();
    } finally {
      await prisma.$disconnect();
    }

    res.send("application rejected");
    return resolve();
  });
};
