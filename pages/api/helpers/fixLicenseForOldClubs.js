import prisma from '../../../middleware/prisma';
import { createSeasons, getCurrentDate } from '../../../middleware/utils';

export default (req, res) => {
  return new Promise(async (resolve) => {
    let promises = [];

    const applications = await prisma.applications.findMany({
      where: {
        OR: [
          {
            status_id: 8,
          },
          {
            status_id: 10,
          },
        ],
      },
    });

    applications.forEach((application) => {
      const updatedAt = application.updated_at;
      const year = updatedAt.split(',')[0].slice(-4);
      const firstSeasonYear = application.seasons.slice(0, 4);
      console.log(year);
      if (year < firstSeasonYear) {
        promises.push(
          prisma.applications.update({
            where: {
              id: application.id,
            },
            data: {
              is_new_season: true,
            },
          }),
        );
      }
    });

    Promise.all(promises)
      .then(async (response) => {
        res.send('licenses fixed');
      })
      .catch((err) => {
        console.log(err.response?.data || err);
        res.status(400);
        res.json({
          type: 'error',
          message: err,
        });
      });

    await prisma.$disconnect();
  });
};
