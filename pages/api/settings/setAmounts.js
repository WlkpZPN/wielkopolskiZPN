import prisma from '../../../middleware/prisma';

export default (req, res) => {
  return new Promise(async (resolve) => {
    const { primaryAmount, extraAmount, extraAmount2, vFee, abFee, youngFee, futsalFee, womenFee } =
      req.body;

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
          futsal_application_fee: Number(futsalFee),
          women_application_fee: Number(womenFee),
        },
        create: {
          iv_application_fee: Number(primaryAmount),
          v_application_fee: Number(vFee),
          young_application_fee: Number(youngFee),
          ab_application_fee: Number(abFee),
          iv_possession_fee: Number(extraAmount),
          v_possession_fee: Number(extraAmount2),
          futsal_application_fee: Number(futsalFee),
          women_application_fee: Number(womenFee),
        },
      });
      res.send('amount updated');
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
