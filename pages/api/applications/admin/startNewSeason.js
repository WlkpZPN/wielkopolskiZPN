import prisma from "../../../../middleware/prisma";
import { getCurrentDate } from "../../../../middleware/utils";

export default async (req, res) => {
  return new Promise(async (resolve) => {
    const { leauge, setForAll } = req.body;
    let promises = [];
    if (setForAll) {

      try {
        //1. ustawic we wszysktich aplikacjach status zakonczony
        await prisma.applications.updateMany({
          data: {
            status_id: 12,
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
        res.status(200);
        res.send('new season started');

      } catch (e) {
        res.status(400);
        res.send(e);
        console.log(e);
        return resolve();
      }
    } else {
      try {
        await prisma.applications.updateMany({
          where: {
            clubs: {
              leauge: leauge,
            }
          },
          data: {
            status_id: 12,
          },
        });

        await prisma.leagues.updateMany({
          where: {
            name: leauge,
          },
          data: {
            updated_at: getCurrentDate()
          },

        });

        res.status(200);
        res.send('new season started');
      } catch (e) {
        res.status(400);
        res.send(e);
        console.log(e);
        return resolve();
      }

    }
    return resolve();
  });
};
