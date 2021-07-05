import prisma from "../../../middleware/prisma";
import transporter from "../../../middleware/transporter";
import axios from "axios";
import emailTemplate from "../../../middleware/emailTemplate";
import { getCurrentDate } from "../../../middleware/utils";
export default (req, res) => {
  return new Promise(async (resolve) => {
    const { message, recipients, title } = req.body;
    let clubs = [];
    //1. check the rule for clubs
    //2. get all clubs that met conditions
    // console.log("message", message);

    switch (recipients) {
      case "aktywne":
        clubs = await prisma.clubs.findMany({
          where: {
            active: true,
          },
        });
        break;
      case "niekatywne":
        clubs = await prisma.clubs.findMany({
          where: {
            active: false,
          },
        });
        break;
      case "nierozpoczęte":
        clubs = await prisma.clubs.findMany({
          select: {
            internal_id: true,
            name: true,
            applications: {
              status_id: true,
            },
          },
          include: {
            applications: {
              select: {
                status_id: true,
              },
            },
          },
          where: {
            OR: [
              {
                applications: {
                  none: {},
                },
              },
              {
                applications: {
                  every: {
                    status_id: 1,
                  },
                },
              },
            ],
          },
        });
      case "zatwierdzone":
        clubs = await prisma.clubs.findMany({
          where: {
            applications: {
              every: {
                OR: [
                  {
                    status_id: 2,
                  },
                  {
                    status_id: 3,
                  },
                ],
              },
            },
          },
        });
        break;
      case "wszystkie":
        clubs = await prisma.clubs.findMany();
        break;
    }

    res.json({
      clubs,
      clubsLength: clubs.length,
    });

    return resolve();
  });
};
