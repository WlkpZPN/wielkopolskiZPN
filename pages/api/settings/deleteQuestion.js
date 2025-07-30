import prisma from '../../../middleware/prisma';

export default (req, res) => {
  return new Promise(async (resolve) => {
    const { questionID } = req.body;
    try {
      await prisma.frequently_asked_questions.delete({
        where: {
          id: parseInt(questionID),
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

    res.send('Question deleted');
    return resolve();
  });
};
