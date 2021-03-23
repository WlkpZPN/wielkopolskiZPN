import prisma from "../../../middleware/prisma";

export default (req, res) => {
  return new Promise(async (resolve) => {
    const { data, clubId } = req.body;

    await prisma.clubs.update({
      where: {
        id: clubId,
      },
      data: {
        ...data,
        updated_at: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
      },
    });
    res.send("data updated");
    return resolve();
  });
};
