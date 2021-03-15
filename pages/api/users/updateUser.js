import prisma from "../../../middleware/prisma";
const bcrypt = require("bcrypt");
const saltRounds = 10;

export default async (req, res) => {
  return new Promise(async (resolve) => {
    const { id, email, password, lastName, firstName, role } = req.body;
    console.log(req.body);
    let securedPassword = "";
    bcrypt.hash(password, saltRounds).then(async (hash) => {
      securedPassword = hash;

      const updateUser = await prisma.users.update({
        where: {
          id: id,
        },
        data: {
          email,
          password: securedPassword,
          name: `${firstName} ${lastName}`,
          role_id: parseInt(role),
        },
      });
    });

    res.status(200).send(`user ${email} updated`);
    return resolve();
  });
};
