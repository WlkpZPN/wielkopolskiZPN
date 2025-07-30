import prisma from '../../../middleware/prisma';

export default (req, res) => {
  return new Promise(async (resolve) => {
    const { userID } = req.body;
    const deleteUser = await prisma.users.delete({
      where: {
        id: userID,
      },
    });

    res.send('user deleted');
    return resolve();
  });
};
