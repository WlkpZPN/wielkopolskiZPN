import prisma from "../../../middleware/prisma";

export default (req, res) => {
  return new Promise(async (resolve) => {
    try {
      const users = await prisma.users.findMany({
        include: {
          roles: true,
        },
      });

      res.status(200);
      res.send(users);
    } catch (error) {
      console.log(error);
      res.status(400);
      res.json(error);
    }

    return resolve();
  });
};
