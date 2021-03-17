import prisma from "../../../middleware/prisma";
import { getCurrentDate } from "../../../middleware/utils";
export default async (req, res) => {
  return new Promise(async (resolve) => {
    const { applicationID, statusID, reason } = req.body;
    console.log(req.body);
    await prisma.applications.update({
      where: {
        id: applicationID,
      },
      data: {
        status_id: statusID,
        reject_reason: reason || "",
      },
    });

    await prisma.histories.create({
      data: {
        application_id: applicationID,
        status_id: statusID,
        description: reason || "",
      },
    });

    res.send("licencja wydana");
    return resolve();
  });
};
