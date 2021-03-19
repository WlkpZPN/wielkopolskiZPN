import prisma from "../../../middleware/prisma";
import { getCurrentDate } from "../../../middleware/utils";

export default async (req, res) => {
  return new Promise(async (resolve) => {
    const { applicationID } = req.body;

    const history = await prisma.histories.findMany({
      where: {
        application_id: applicationID,
      },
      orderBy: {
        id: "desc",
      },
    });

    res.json({
      history: history,
    });
    return resolve();
  });
};
