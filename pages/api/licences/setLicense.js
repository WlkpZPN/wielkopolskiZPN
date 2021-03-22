import prisma from "../../../middleware/prisma";
import { getCurrentDate } from "../../../middleware/utils";
export default async (req, res) => {
  return new Promise(async (resolve) => {
    const { applicationID, statusID, reason, description } = req.body;
    console.log(req.body);
    await prisma.applications.update({
      where: {
        id: parseInt(applicationID),
      },
      data: {
        status_id: parseInt(statusID),
        reject_reason: reason || "",
      },
    });

    await prisma.histories.create({
      data: {
        application_id: parseInt(applicationID),
        status_id: statusID,
        description: description,
      },
    });

    res.send("licencja wydana");
    return resolve();
  });
};
