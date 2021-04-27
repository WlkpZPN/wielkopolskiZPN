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
    try {
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
            where: {
              applications: {
                none: {},
              },
            },
          });
          break;
        case "zatwierdzone":
          clubs = await prisma.clubs.findMany({
            where: {
              applications: {
                every: {
                  OR: [
                    {
                      id: 2,
                    },
                    {
                      id: 3,
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

      let recipientsEmails = [];
      let content = [];

      clubs.forEach((club, index) => {
        let i = 0;

        recipientsEmails.push({
          name: club.name,
          email: club.email,
        });
        content.push({
          type: "text/html",
          body: emailTemplate(title, message.message),
        });
      });

      // let i,
      //   tmpRecipients,
      //   response,
      //   tmpContent,
      //   chunk = 100;
      // for (i = 0; i < recipientsEmails.length; i += chunk) {
      //   tmpRecipients = recipientsEmails.slice(i, i + chunk);
      //   tmpContent = content.slice(i, i + chunk);
      //   response = await axios({
      //     url: "https://api.freshmail.com/v3/messaging/emails",
      //     method: "POST",
      //     headers: {
      //       Authorization: `Bearer ${process.env.FRESHMAIL_TOKEN}`,
      //       "Content-Type": "application/json",
      //     },
      //     data: {
      //       from: {
      //         email: "licklub@wielkopolskizpn.pl",
      //         name: "Wielkopolski ZPN",
      //       },
      //       recipients: tmpRecipients,
      //       subject: title,
      //       contents: tmpContent,
      //     },
      //   });
      //   console.log("response", response);
      // }

      //***********************************************************

      const response = await axios({
        url: "https://api.freshmail.com/v3/messaging/emails",
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.FRESHMAIL_TOKEN}`,
          "Content-Type": "application/json",
        },
        data: {
          from: {
            email: "licklub@wielkopolskizpn.pl",
            name: "Wielkopolski ZPN",
          },
          recipients: [
            {
              email: "aleksanderfranczak99@gmail.com",
              name: "Olek",
            },
            {
              email: "hondakkia@gmail.com",
              name: "Olek",
            },
          ],
          contents: [
            {
              type: "text/html",
              body: "<p>akdmdwmawldmalkdmlm TEST HTML</p>",
            },
            {
              type: "text/html",
              body: "<p>akdmdwmawldmalkdmlm TEST HTML</p>",
            },
          ],
          subject: title,
        },
      });

      await prisma.messages.update({
        where: {
          id: parseInt(message.id),
        },
        data: {
          send_date: getCurrentDate(),
        },
      });
      console.log("response", response.data, response.status);
      //console.log("data", recipientsEmails);
      res.send("email sended");
    } catch (err) {
      console.log(err);
      console.log(err.response?.data);
      res.status(400);
      res.json({
        type: "error",
        message: err,
      });
    }

    //aktywne
    //nieaktywne
    //nierozpoczęte
    //zatwierdzone
    //wszystkie
    //res.send(clubs);

    //res.send("test");
    //3. send maild to all that clubs
    await prisma.$disconnect();
  });
};
