import prisma from '../../../middleware/prisma';

export default async (req, res) => {
  return new Promise(async (resolve) => {
    const { facilityId } = req.body;
    console.log(facilityId);

    try {
      await prisma.applications_attachments.deleteMany({
        where: {
          sport_facilities_id: parseInt(facilityId),
        },
      });
      await prisma.futsal_facilities.delete({
        where: {
          id: parseInt(facilityId),
        },
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
      return resolve();
    } finally {
      await prisma.$disconnect();
    }

    res.send('facility deleted');
    return resolve();
  });
};
