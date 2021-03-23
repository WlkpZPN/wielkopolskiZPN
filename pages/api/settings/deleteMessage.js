import prisma from "../../../middleware/prisma";
import { getCurrentDate } from "../../../middleware/utils";
export default (req, res) => {
  return new Promise(async (resolve) => {
    const { messageID } = req.body;
    try {
      await prisma.messages.delete({
        where: {
          id: parseInt(messageID),
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

    res.send("message deleted");
    return resolve();
  });
};
