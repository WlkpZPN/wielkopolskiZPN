import prisma from '../../../middleware/prisma';

export default (req, res) => {
  return new Promise(async (resolve) => {
    const { startDate, futsalStartDate } = req.body;

    try {
      await prisma.settings.upsert({
        where: {
          id: 1,
        },
        update: {
          start_date: startDate,
          futsal_start_date: futsalStartDate,
        },
        create: {
          start_date: startDate,
          futsal_start_date: futsalStartDate,
        },
      });
      res.send('dates updated');
    } catch (error) {
      console.log(error);
      res.status(400);
      res.send(error);
    } finally {
      await prisma.$disconnect();
    }

    return resolve();
  });
};
