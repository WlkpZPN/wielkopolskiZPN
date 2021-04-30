import prisma from "../../../middleware/prisma";

export default (req, res) => {
  return new Promise(async (resolve) => {
    const { clubID } = req.body;

    try {
      await prisma.clubs.delete({
        where: {
          id: parseInt(clubID),
        },
      });

      res.status(200);
      res.send("Klub usunięty");
    } catch (error) {
      console.log(error);
      res.status(400);
      res.send("Usuwanie klubu nie powiodło się");
    }

    return resolve();
  });
};
