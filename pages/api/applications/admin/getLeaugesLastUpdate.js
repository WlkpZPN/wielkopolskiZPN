import prisma from '../../../../middleware/prisma';
import { getCurrentDate } from '../../../../middleware/utils';

export default async (req, res) => {
  return new Promise(async (resolve) => {
    try {
      const leauges = await prisma.leagues.findMany();

      res.status(200);
      res.send(leauges);
    } catch (e) {
      res.status(400);
      res.send(e);
      console.log(e);
      return resolve();
    }

    return resolve();
  });
};
