import prisma from "../../../middleware/prisma";

export default (req, res) => {
  return new Promise(async (resolve) => {
    const { clubID, applicationID } = req.data;
    try {
      // 1. delete all histories
      await prisma.histories.deleteMany({
        where: {
          application_id: parseInt(applicationID),
        },
      });

      // 2. delete sport facilities
      await prisma.sport_facilities.deleteMany({
        where: {
          application_id: parseInt(applicationID),
        },
      });
      // 3. delete application

      await prisma.applications.delete({
        where: {
          id: parseInt(applicationID),
        },
      });
      // 4.delete files TO DO LATER
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  });
};
