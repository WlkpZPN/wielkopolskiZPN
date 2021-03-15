import jwt from "jsonwebtoken";
import cookie from "cookie";
import prisma from "../../../middleware/prisma";
export default async (req, res) => {
  return new Promise(async (resolve) => {
    const { email } = req.body;

    //TO DO
    // create new token and send new cookie
    const user = await prisma.users.findFirst({
      where: {
        email: email,
      },
      include: {
        roles: true,
      },
    });
    console.log("user data", user);
    if (user) {
      const payload = {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
      };
      const token = jwt.sign(payload, process.env.AUTH_KEY, {
        expiresIn: "16h",
      });

      try {
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("userToken", token, {
            maxAge: 43200,
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
          })
        );
        res.status(200).send(payload);
        return resolve();
      } catch (err) {
        console.log(err);
        res.status(400);
        res.json({
          message: err,
        });
      }
    } else {
      res.status(400);
      res.json({
        message: "Nie znaleziono użytkownika",
      });
    }

    res.json({
      user,
    });
    return resolve();
  });
};
