import prisma from '../../../../middleware/prisma';
import { getCurrentDate } from '../../../../middleware/utils';
import { stat } from '../../../../middleware/types/stats';
export default async (req, res) => {
  return new Promise(async (resolve) => {
    const { stat: statType } = req.query;

    // stats types:
    let applications;

    switch (statType) {
      case stat.uncompleted:
        try {
          const result = await prisma.clubs.findMany({
            where: {
              applications: {
                none: {},
              },
            },
            select: {
              id: true,
            },
          });
          applications = result.length;
        } catch (error) {
          console.log(error);
          res.status(400);
          res.send(error);
          return resolve();
        } finally {
          await prisma.$disconnect();
        }
        break;

      case stat.paid:
      case stat.unpaid:
      case stat.rejected:
        try {
          applications = await prisma.applications.count({
            where: {
              status_id: parseInt(statType),
            },
          });
        } catch (error) {
          console.log(error);
          res.status(400);
          res.send(error);
          return resolve();
        } finally {
          await prisma.$disconnect();
        }
        break;
      case stat.sended:
        try {
          applications = await prisma.applications.count({
            where: {
              OR: [{ status_id: 2 }, { status_id: 3 }],
            },
          });
        } catch (error) {
          console.log(error);
          res.status(400);
          res.send(error);
          return resolve();
        } finally {
          await prisma.$disconnect();
        }
        break;
      default:
        console.log('default');
        break;
    }

    const allApplications = await prisma.clubs.count();

    await prisma.$disconnect();
    //console.log(applications, allApplications);
    const percent = (Math.round((applications / allApplications) * 100) / 100) * 100;
    res.status(200);

    res.json({
      percent,
      allApplications: applications,
    });
    return resolve();

    // if (getUncompleted) {
    //   // kluby,które nie posiadają żadnego wniosku

    //   try {
    //     const applications = await prisma.clubs.findMany({
    //       where: {
    //         applications: {
    //           none: {},
    //         },
    //       },
    //       // select: {
    //       //   id: true,
    //       // },
    //     });
    //     // wszystkie kluby w bazie
    //     const allApplications = await prisma.clubs.count();
    //     res.json({
    //       applications: applications.length,
    //       allApplications: allApplications,
    //     });
    //     return resolve();
    //   } catch (error) {
    //     console.log(error);
    //     res.status(400);
    //     res.json(error);
    //     return resolve();
    //   } finally {
    //     await prisma.$disconnect();
    //   }
    // }

    // try {
    //   const applications = await prisma.applications.count({
    //     where: {
    //       status_id: statusID,
    //     },
    //   });

    //   const allApplications = await prisma.clubs.count();

    //   res.json({
    //     applications: applications,
    //     allApplications: allApplications,
    //   });
    //   return resolve();
    // } catch (error) {
    //   console.log(error);
    //   res.status(400).json(error);
    //   return resolve();
    // }
  });
};
