import prisma from '../../../middleware/prisma';
import { getCurrentDate } from '../../../middleware/utils';
export default async (req, res) => {
  return new Promise(async (resolve) => {
    const { description, applicationID, statusID } = req.body;
    try {
      await prisma.histories.create({
        data: {
          application_id: applicationID,
          created_at: getCurrentDate(),
          description: description,
          status_id: statusID,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
      return resolve();
    } finally {
      await prisma.$disconnect();
    }

    res.send('application history updated');
    return resolve();
  });
};
