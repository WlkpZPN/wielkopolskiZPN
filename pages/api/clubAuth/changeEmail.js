import prisma from '../../../middleware/prisma';

export default (req, res) => {
  return new Promise(async (resolve) => {
    const clubs = await prisma.clubs.findMany();

    // clubs.forEach(async (club) => {
    //   try {
    //     await prisma.clubs.update({
    //       where: {
    //         id: club.id,
    //       },
    //       data: {
    //         email: club.email.slice(0, -1),
    //       },
    //     });
    //   } catch (err) {
    //     console.log(err);
    //     res.status(400).send(err);
    //   }
    // });
    res.json(clubs);
    //res.send("email updated");

    return resolve();
  });
};
