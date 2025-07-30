import prisma from '../../../middleware/prisma';

export default (req, res) => {
  return new Promise(async (resolve) => {
    console.log(req.body);
    const { debt, clubId } = req.body;
    console.log(debt, clubId);
    await prisma.clubs.update({
      where: {
        id: clubId,
      },
      data: {
        debt: debt,
      },
    });
    res.send('data updated');
    return resolve();
  });
};
