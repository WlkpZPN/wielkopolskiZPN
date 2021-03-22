import prisma from "../../../middleware/prisma";

export default (req, res) => {
  return new Promise(async (resolve) => {
    const { startDate, endDate } = req.body;

    try {
      await prisma.settings.upsert({
        where: {
          id: 1,
        },
        update: {
            start_date:startDate,
            end_date:endDate,
        },
        create: {
            start_date:startDate,
            end_date:endDate,
        },
      });
      res.send("dates updated");
    } catch (error) {
      conosle.log(error);
      res.status(400);
      res.send(error);
    }

    return resolve();
  });
};
