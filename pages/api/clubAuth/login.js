import prisma from '../../../middleware/prisma';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
const KEY = process.env.AUTH_KEY;
export default (req, res) => {
  return new Promise(async (resolve) => {
    const { email, password } = req.body;

    if (!req.body) {
      res.status(400);
      res.json({
        status: 'error',
        message:
          'logowanie nie powiodło się, spróbuj skorzystać z innej przeglądarki lub odśwież stronę',
      });
    }

    if (!email || !password) {
      res.status(400);
      res.json({
        status: 'error',
        message: 'proszę wpisać email i hasło',
      });
      return resolve();
    }

    const club = await prisma.clubs.findFirst({
      where: {
        email: email,
      },
    });
    const clubs = await prisma.clubs.findMany();
    // console.log("klub", club);
    // console.log("kluby", clubs);

    if (!club) {
      res.status(400);
      res.json({
        status: 'error',
        message: 'Użytkownik o podanym mailu nie istnieje',
      });
      return resolve();
    }

    if (club.password.trim() !== password.trim()) {
      res.status(400);
      res.json({
        status: 'error',
        message: 'Błedne hasło,spróbuj ponownie',
      });
      return resolve();
    }

    const payload = {
      id: club.id,
      name: club.name,
      email: club.email,
      role: 'klub',
    };

    const token = jwt.sign(payload, process.env.AUTH_KEY, {
      expiresIn: '16h',
    });

    try {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('clubToken', token, {
          maxAge: 43200,
          path: '/',
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
        }),
      );
      res.status(200).send(payload);
      return resolve();
    } catch (err) {
      res.status(500);
      res.json({
        status: 'error',
        message: 'podczas logowania wystąpił nieznany problem,proszę spróbuj ponownie',
      });
      return resolve();
    }
  });
};
