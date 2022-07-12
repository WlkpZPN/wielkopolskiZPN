import prisma from "../../../../middleware/prisma";
import { getCurrentDate } from "../../../../middleware/utils";

export default async (req, res) => {
  return new Promise(async (resolve) => {
    const { leauge, setForAll } = req.body;
    let promises = [];
    const currentYear = new Date().getFullYear();
    if (setForAll) {
      try {
        const applications = await prisma.applications.findMany();
        applications.forEach((application) => {
          const seasons = application.seasons;
          if (seasons) {
            const endYear = seasons.slice(-4);

            if (endYear <= currentYear) {

              promises.push(prisma.applications.update({
                where: {
                  id: application.id,
                },
                data: {
                  is_new_season: true,
                },
              }));
            }
          }

        });

        await prisma.leagues.updateMany({
          where: {
            name: 'brak'
          },
          data: {
            updated_at: getCurrentDate()
          },


        });

      } catch (e) {
        res.status(400);
        res.send(e);
        console.log(e);
        return resolve();
      }
    } else {
      try {
        const applications = await prisma.applications.findMany({
          where: {
            league: leauge,
          }
        });
        applications.forEach((application) => {
          const seasons = application.seasons;
          if (seasons) {
            const endYear = seasons.slice(-4);

            if (endYear <= currentYear) {
              promises.push(prisma.applications.update({
                where: {
                  id: application.id,
                },
                data: {
                  is_new_season: true,
                },
              }));
            }
          }

        });

        await prisma.leagues.updateMany({
          where: {
            name: leauge,
          },
          data: {
            updated_at: getCurrentDate()
          },

        });


      } catch (e) {
        res.status(400);
        res.send(e);
        console.log(e);
        return resolve();
      }

    }

    await Promise.all(promises)
      .then(async (response) => {
        res.send("new season started");
      })
      .catch((err) => {
        console.log(err.response?.data || err);
        res.status(400);
        res.json({
          type: "error",
          message: err,
        });
      });
    return resolve();
  });
};
