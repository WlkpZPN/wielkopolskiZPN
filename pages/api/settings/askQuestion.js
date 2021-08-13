import prisma from "../../../middleware/prisma";
import { getCurrentDate } from "../../../middleware/utils";
export default (req, res) => {
  return new Promise(async (resolve) => {
    const { question, answer, category,clubName } = req.body;
    try {
      await prisma.frequently_asked_questions.create({
        data: {
          club_name:clubName,
          question,
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

    res.send("Question asked");
    return resolve();
  });
};
