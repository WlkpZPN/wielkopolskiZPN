import prisma from "../../../middleware/prisma";

export default (req, res) => {
  return new Promise(async (resolve) => {
    const {
      primaryAmount,
      extraAmount,
      extraAmount2,
      vFee,
      abFee,
      youngFee,
    } = req.body;

    try {
      await prisma.settings.upsert({
        where: {
          id: 1,
        },
        update: {
          iv_application_fee: Number(primaryAmount),
          v_application_fee: Number(vFee),
          young_application_fee: Number(youngFee),
          ab_application_fee: Number(abFee),
          iv_possession_fee: Number(extraAmount),
          v_possession_fee: Number(extraAmount2),
        },
        create: {
          iv_application_fee: Number(primaryAmount),
          v_application_fee: Number(vFee),
          young_application_fee: Number(youngFee),
          ab_application_fee: Number(abFee),
          iv_possession_fee: Number(extraAmount),
          v_possession_fee: Number(extraAmount2),
        },
      });
      res.send("amount updated");
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
