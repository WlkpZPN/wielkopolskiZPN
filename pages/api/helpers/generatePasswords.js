import prisma from "../../../middleware/prisma";
import generator from "generate-password";
const bcrypt = require("bcrypt");
const saltRounds = 10;
export default async (req, res) => {
  return new Promise(async (resolve) => {
    const clubs = await prisma.clubs.findMany();

    clubs.forEach(async (club, index) => {
      let securedPassword = "";
      bcrypt
        .hash(generator.generate({ length: 8, number: true }), saltRounds)
        .then(async (hash) => {
          securedPassword = hash;
          await prisma.clubs.update({
            where: {
              id: club.id,
            },
            data: {
              password: securedPassword,
            },
          });
        });
    });

    res.send("id's generated");
    return resolve();
  });
};