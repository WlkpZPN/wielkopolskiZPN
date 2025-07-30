import prisma from '../../../middleware/prisma';
import transporter from '../../../middleware/transporter';
import axios from 'axios';
import emailTemplate from '../../../middleware/emailTemplate';
import { getCurrentDate } from '../../../middleware/utils';
export default (req, res) => {
  return new Promise(async (resolve) => {
    const { message, recipients, title } = req.body;
    let clubs = [];
    //1. check the rule for clubs
    //2. get all clubs that met conditions
    // console.log("message", message);
    try {
      switch (recipients) {
        case 'aktywne':
          clubs = await prisma.clubs.findMany({
            where: {
              active: true,
            },
          });
          break;
        case 'niekatywne':
          clubs = await prisma.clubs.findMany({
            where: {
              active: false,
            },
          });
          break;
        case 'nierozpoczęte':
          clubs = await prisma.clubs.findMany({
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
              NOT: [{ leauge: null }],
              active: true,
            },
            select: {
              leauge: true,
              active: true,
              name: true,
              applications: true,
            },
          });
          break;
        case 'zatwierdzone':
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
        case 'wszystkie':
          clubs = await prisma.clubs.findMany();
          break;
      }
    } catch (err) {
      res.send(err);
      console.log(err);
      res.send(400);
      return resolve();
    }

    res.json({
      clubs,
      clubsLength: clubs.length,
    });

    return resolve();
  });
};
