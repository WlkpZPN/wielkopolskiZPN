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

// ROLES
// 0 - superuser
// 1 - admin
// 2 - mod
// 3 - other
// >= 4 - client/club
