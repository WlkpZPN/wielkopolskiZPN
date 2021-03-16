import prisma from "../../../middleware/prisma";

export default async (req, res) => {
  return new Promise(async (resolve) => {
    const { facilityId } = req.body;
    console.log(facilityId);
    await prisma.sport_facilities.delete({
      where: {
        id: parseInt(facilityId),
      },
    });

    res.send("facility deleted");
    return resolve();
  });
};
