import prisma from '../../../middleware/prisma';

export default (req, res) => {
  return new Promise(async (resolve) => {
    try {
      const roles = await prisma.roles.findMany({
        where: {
          NOT: [
            {
              name: 'klub',
            },
          ],
        },
      });

      res.status(200);
      res.send(roles);
    } catch (error) {
      console.log(error);
      res.status(400);
      res.json(error);
    }

    return resolve();
  });
};
