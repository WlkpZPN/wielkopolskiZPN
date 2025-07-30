import prisma from '../../../middleware/prisma';
import { getCurrentDate } from '../../../middleware/utils';
import axios from 'axios';
export default (req, res) => {
  return new Promise(async (resolve) => {
    const { data, clubId } = req.body;
    try {
      await prisma.clubs.update({
        where: {
          id: clubId,
        },
        data: {
          ...data,
          updated_at: getCurrentDate(),
        },
      });
      res.send('data updated');
      return resolve();
    } catch (error) {
      console.log('error', error);
      res.status(400);
      res.send(error);
    } finally {
      await prisma.$disconnect();
    }
  });
};
