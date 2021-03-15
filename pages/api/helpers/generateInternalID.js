import prisma from "../../../middleware/prisma";

export default async (req, res) => {
  return new Promise(async (resolve) => {
    const clubs = await prisma.clubs.findMany();

    let IDArray = [];

    clubs.forEach(async (club, index) => {
      await prisma.clubs.update({
        where: {
          id: club.id,
        },
        data: {
          internal_id: `K/${new Date().getFullYear()}/${index.toLocaleString(
            "en-US",
            {
              minimumIntegerDigits: 2,
              useGrouping: false,
            }
          )}`,
        },
      });
    });

    res.send("id's generated");
    return resolve();
  });
};
