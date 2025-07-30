import prisma from '../../../middleware/prisma';

export default (req, res) => {
  return new Promise(async (resolve) => {
    try {
      const { lockMode } = req.body;

      await prisma.settings.update({
        where: {
          id: 1,
        },
        data: {
          locked_sending: lockMode,
        },
      });

      res.status(200);
      res.send('Lock mode changed');
    } catch (error) {
      console.log(error);
      res.status(400);
      res.send(error);
    }

    return resolve();
  });
};
