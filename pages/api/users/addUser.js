import prisma from '../../../middleware/prisma';
const bcrypt = require('bcrypt');
const saltRounds = 10;

export default (req, res) => {
  return new Promise(async (resolve) => {
    console.log(req.body);

    const { email, password, firstName, lastName, role } = req.body;
    let securedPassword = '';
    bcrypt.hash(password, saltRounds).then(async (hash) => {
      securedPassword = hash;
      await prisma.users.create({
        data: {
          email: email,
          name: `${firstName} ${lastName}`,
          password: securedPassword,
          role_id: parseInt(role),
        },
      });
      res.send('user added');
      return resolve();
    });
  });
};

// ROLES
// 0 - superuser
// 1 - admin
// 2 - mod
// 3 - other
// >= 4 - client/club
