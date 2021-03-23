import prisma from "../../../middleware/prisma";
import { getCurrentDate } from "../../../middleware/utils";
export default (req, res) => {
  return new Promise(async (resolve) => {
    const { title, recipients, rule, message } = req.body;
    try {
      await prisma.messages.create({
        data: {
          title,
          rule,
          recipients,
          message,
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

    res.send("message created");
    return resolve();
  });
};
