import prisma from "../../../middleware/prisma";

export default (req, res) => {
  return new Promise(async (resolve) => {
    try {
      const applications = await prisma.applications.findMany({
        include: {
          statuses: true,
          clubs: true,
        },
      });
      res.status(200);
      res.send(applications);
    } catch (err) {
      console.log(err);
      res.status(400);
    } finally {
      await prisma.$disconnect();
    }

    return resolve();
  });
};
