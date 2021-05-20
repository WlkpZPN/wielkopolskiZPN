import prisma from "../../../middleware/prisma";
import generator from "generate-password";
const bcrypt = require("bcrypt");
const saltRounds = 10;
export default async (req, res) => {
  return new Promise(async (resolve) => {
    let promises = [];
    const clubs = await prisma.clubs.findMany({
      where: {
        password: {
          equals: null,
        },
      },
    });

    clubs.forEach(async (club, index) => {
      promises.push(
        prisma.clubs.update({
          where: {
            id: club.id,
          },
          data: {
            password: generator.generate({
              length: 8,
              numbers: true,
            }),
          },
        })
      );
    });

    Promise.all(promises).then((res) => {
      res.send(clubs);
    });

    // res.send("passwords's generated");
    return resolve();
  });
};
