import prisma from "../../../middleware/prisma";
import generator from "generate-password";
const bcrypt = require("bcrypt");
const saltRounds = 10;
export default async (req, res) => {
  return new Promise(async (resolve) => {
    const clubs = await prisma.clubs.findMany({
      where: {
        password: {
          equals: null,
        },
      },
    });

    clubs.forEach(async (club, index) => {
      await prisma.clubs.update({
        where: {
          id: club.id,
        },
        data: {
          password: generator.generate({
            length: 8,
            numbers: true,
          }),
        },
      });

      // bcrypt
      //   .hash(generator.generate({ length: 8, number: true }), saltRounds)
      //   .then(async (hash) => {
      //     securedPassword = hash;
      //     await prisma.clubs.update({
      //       where: {
      //         id: club.id,
      //       },
      //       data: {
      //         password: securedPassword,
      //       },
      //     });
      //   });
    });

    res.send(clubs);
    // res.send("passwords's generated");
    return resolve();
  });
};
