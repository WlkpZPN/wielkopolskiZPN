import prisma from "../../../middleware/prisma";

export default (req, res) => {
  return new Promise(async (resolve) => {
    const { clubID } = req.query;

    const clubData = await prisma.clubs.findMany({
      include: {
        applications: {
          include: {
            statuses: true,
            applications_attachments: true,
            histories: true,
            sport_facilities: {
              include: {
                applications_attachments: true,
              },
            },
          },
        },
      },
    });
    res.send(clubData);
    await prisma.$disconnect();
    return resolve();
  });
};
