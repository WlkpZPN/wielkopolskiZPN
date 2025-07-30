import prisma from '../../../middleware/prisma';
import { getCurrentDate } from '../../../middleware/utils';
export default (req, res) => {
  return new Promise(async (resolve) => {
    const { question, answer, category, ID } = req.body;
    try {
      await prisma.frequently_asked_questions.update({
        where: {
          id: parseInt(ID),
        },
        data: {
          question,
          answer,
          category,
          created_at: getCurrentDate(),
        },
      });
    } catch (err) {
      console.log(err);
      res.status(400);
      res.json({
        error: err,
      });
    } finally {
      await prisma.$disconnect();
    }

    res.send('Question updated');
    return resolve();
  });
};
