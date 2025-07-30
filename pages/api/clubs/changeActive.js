import prisma from '../../../middleware/prisma';

export default (req, res) => {
  return new Promise(async (resolve) => {
    console.log(req.body);
    const { active, clubId } = req.body;

    await prisma.clubs.update({
      where: {
        id: clubId,
      },
      data: {
        active: active,
      },
    });
    res.send('data updated');
    return resolve();
  });
};
