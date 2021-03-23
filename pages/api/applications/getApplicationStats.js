import prisma from "../../../middleware/prisma";
import { getCurrentDate } from "../../../middleware/utils";

export default async (req, res) => {
  return new Promise(async (resolve) => {
    const { statusID, getEmpty, getUncompleted } = req.body;

    if (getUncompleted) {
      // kluby,które nie posiadają żadnego wniosku
      const applications = await prisma.clubs.findMany({
        where: {
          applications: {
            none: {},
          },
        },
        // select: {
        //   id: true,
        // },
      });
      // wszystkie kluby w bazie
      const allApplications = await prisma.clubs.count();
      res.json({
        applications: applications.length,
        allApplications: allApplications,
      });
      return resolve();
    }

    const applications = await prisma.applications.count({
      where: {
        status_id: statusID,
      },
    });

    const allApplications = await prisma.clubs.count();

    await prisma.$disconnect();

    res.json({
      applications: applications,
      allApplications: allApplications,
    });
    return resolve();
  });
};
