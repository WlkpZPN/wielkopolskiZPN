import bcrypt from 'bcrypt';
import prisma from '../../../middleware/prisma';
const saltRounds = 10;
export default (req, res) => {
  return new Promise(async (resolve) => {
    const { clubID, newPassword, oldPassword } = req.body;

    try {
      //1. get club from db
      const club = await prisma.clubs.findUnique({
        where: {
          id: parseInt(clubID),
        },
      });
      //2. check if previous password is valid

      if (club.password === oldPassword) {
        // pasword is ok, update the club password

        await prisma.clubs.update({
          where: {
            id: parseInt(clubID),
          },
          data: {
            password: newPassword,
          },
        });

        res.send('Password updated!');
        return resolve();
      } else {
        // password is not ok, return message

        res.status(401);
        res.json({
          status: 'Odmowa dostępu',
          message:
            'aktualne hasło nieprawidłowe,upewnij się że podajesz dobre hasło oraz zwróć uwagę na wielkość liter',
        });
        return resolve();
      }
    } catch (err) {
      console.log(err);
      res.status(400);
      res.json({
        status: 'error',
        message: err,
      });
    }
    return resolve();
  });
};
