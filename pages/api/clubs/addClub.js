import prisma from "../../../middleware/prisma";
import { getInternalId } from "../../../middleware/utils";
export default (req, res) => {
  return new Promise(async (resolve) => {
    const { data } = req.body;
    const club = await prisma.clubs.create({
      data: {
        ...data,
     
      },
    });

    await prisma.clubs.update({
      where: {
        id: club.id,
      },
      data: {
        internal_id: getInternalId(club.id, false),
      },
    });
    res.send({ id: club.id });
    return resolve();
  });
};
