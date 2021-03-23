import prisma from "../../../middleware/prisma";

export default (req, res) => {
  return new Promise(async (resolve) => {
    const { primaryAmount, extraAmount } = req.body;

    try {
      await prisma.settings.upsert({
        where: {
          id: 1,
        },
        update: {
          application_fee: primaryAmount,
          no_possession_fee: extraAmount,
        },
        create: {
          application_fee: primaryAmount,
          no_possession_fee: extraAmount,
        },
      });
      res.send("amount updated");
    } catch (error) {
      conosle.log(error);
      res.status(400);
      res.send(error);
    } finally {
      await prisma.$disconnect();
    }

    return resolve();
  });
};
