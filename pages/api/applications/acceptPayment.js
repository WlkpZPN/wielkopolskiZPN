import prisma from '../../../middleware/prisma';
import { getCurrentDate } from '../../../middleware/utils';
export default async (req, res) => {
  return new Promise(async (resolve) => {
    const { applicationID, description, userID } = req.body;
    try {
      await prisma.applications.update({
        where: {
          id: applicationID,
        },
        data: {
          status_id: 7,
        },
      });

      await prisma.histories.create({
        data: {
          application_id: applicationID,
          created_at: getCurrentDate(),
          description: description || 'Płatność zaakceptowana',
          status_id: 7,
          user_id: parseInt(userID),
        },
      });
    } catch (err) {
      console.log(err);
      res.status(400);
      res.json(err);
      return resolve();
    } finally {
      await prisma.$disconnect();
    }

    res.send('application accepted');
    return resolve();
  });
};
