const bcrypt = require('bcrypt');
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import prisma from '../../../middleware/prisma';

export default async (req, res) => {
  const { method } = req;

  return new Promise(async (resolve) => {
    try {
      if (method === 'POST') {
        const { email, password } = req.body;
        // check if email or user is null
        if (!email || !password) {
          return res.status(400).json({
            status: 'error',
            message: 'Brak hasła lub adresu email',
          });
          return resolve();
        }
        // get user from database
        const user = await prisma.users.findFirst({
          where: {
            email: email,
          },
          include: {
            roles: true,
          },
        });
        // check if we have a user
        if (!user) {
          res.status(400).json({
            status: 'error',
            message: 'Użytkownik o podanym adresie email nie istnieje',
          });
        }
        //console.log("user role:", user);
        // compare passwords` QA\`1q  a\Z `111`q  a\
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (isMatch) {
            // create JWT payload
            const payload = {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.roles.name,
            };

            const token = jwt.sign(payload, process.env.AUTH_KEY, {
              expiresIn: '16h',
            });

            try {
              // res.cookie("userToken", token, { httpOnly: true });
              res.setHeader(
                'Set-Cookie',
                cookie.serialize('adminToken', token, {
                  maxAge: 43200,
                  path: '/',
                  httpOnly: true,
                  secure: process.env.NODE_ENV !== 'development',
                }),
              );
              res.status(200).send(payload);
              return resolve();
            } catch (err) {
              console.log(err);
              res.status(500).send({ error: 'There was an error signing in' });
              return resolve();
            }
          } else {
            res.status(400).json({
              message: 'Błędne hasło',
            });
            return resolve();
          }
        });
      } else {
        res.status(401).json({
          status: 'error',
          message: 'Niedozwolona metoda HTTP',
        });
        return resolve();
      }
    } catch (error) {
      throw error;
    }
  });
};
