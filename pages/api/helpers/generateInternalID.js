import prisma from "../../../middleware/prisma";
import generator from "generate-password";
import { getCurrentDate } from "../../../middleware/utils";
const bcrypt = require("bcrypt");
const saltRounds = 10;
export default async (req, res) => {
  return new Promise(async (resolve) => {
    const clubs = await prisma.clubs.findMany();

    clubs.forEach(async (club, index) => {
      await prisma.$connect();
      await prisma.clubs.update({
        where: {
          id: club.id,
        },
        data: {
          updated_at: getCurrentDate(),
          // internal_id: `K/${new Date().getFullYear()}/${index.toLocaleString(
          //   "en-US",
          //   {
          //     minimumIntegerDigits: 2,
          //     useGrouping: false,
          //   }
          // )}`,
        },
      });
      await prisma.$disconnect();
    });
    res.send("id's generated");
    return resolve();
  });
};
