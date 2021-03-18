import prisma from "../../../middleware/prisma";
import { getCurrentDate } from "../../../middleware/utils";
export default async (req, res) => {
  return new Promise(async (resolve) => {
    const { applicationID, description } = req.body;

    await prisma.applications.update({
      where: {
        id: applicationID,
      },
      data: {
        status_id: 7,
      },
    });

    await prisma.histories.create({
      data: {
        application_id: applicationID,
        created_at: getCurrentDate(),
        description: description || "Płatność zaakceptowana",
        status_id: 7,
      },
    });

    res.send("application accepted");
    return resolve();
  });
};