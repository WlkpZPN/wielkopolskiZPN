import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const saltRounds = 10;

export default (req, res) => {
  const password = "Aleksander12";
  let securedPassword = "";
  bcrypt.hash(password, saltRounds).then(async (hash) => {
    console.log(hash);
    securedPassword = hash;
    await prisma.users.create({
      data: {
        email: "hondakkia@gmail.com",
        firstname: "Aleksander",
        lastname: "Franczak",
        password: securedPassword,
        role: 0,
      },
    });
    res.send("user added");
  });
};
