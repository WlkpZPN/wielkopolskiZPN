import prisma from "../../../middleware/prisma";
import { getCurrentDate } from "../../../middleware/utils";

export default (req, res) => {
  return new Promise(async (resolve) => {
    const { data, clubId } = req.body;

    await prisma.clubs.update({
      where: {
        id: clubId,
      },
      data: {
        ...data,
        updated_at: getCurrentDate(),
      },
    });
    res.send("data updated");
    return resolve();
  });
};
