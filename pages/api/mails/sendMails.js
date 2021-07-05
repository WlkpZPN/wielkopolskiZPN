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
        break;
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

    console.log("clubs length", clubs.length);

    let recipientsEmails = [];
    let content = [];
    console.log("clubs", clubs.length);
    clubs.forEach((club, index) => {
      let i = 0;

      recipientsEmails.push({
        email: club.email,

        //name: club.name.replace(/\r?\n|\r/g, " ") || "",
      });
      content.push({
        type: "text/html",
        // body: "<p>Test</p>",
        body: emailTemplate(title, message.message),
      });
    });

    let i,
      tmpRecipients,
      response,
      tmpContent,
      chunk = 100;

    let promises = [];
    let iterationCount = 0;
    //for (i = 0; i < recipientsEmails.length; i += chunk) {
    for (i = 0; i < clubs.length; i++) {
      // tmpRecipients = recipientsEmails.slice(i, i + chunk);
      //tmpContent = content.slice(i, i + chunk);
      // console.log(tmpRecipients.length);
      // console.log(tmpContent.length);

      // tmpRecipients = tmpRecipients.filter((content) => {
      //   if (!content.email) {
      //     return false;
      //   }
      //   return true;
      // });

      // tmpRecipients = tmpRecipients.forEach((content) => {
      //   if (!content.email || !content.name) {
      //     console.log(content);
      //   }
      // });
      if (!recipientsEmails[i].email) {
        continue;
      }
      promises.push(
        axios({
          url: "https://api.freshmail.com/v3/messaging/emails",
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.FRESHMAIL_TOKEN}`,
            "Content-Type": "application/json",
          },
          data: {
            //recipients: tmpRecipients,
            recipients: [recipientsEmails[i]],
            from: {
              name: "Wielkopolski ZPN",
              email: "licklub@wielkopolskizpn.pl",
            },

            subject: title,
            // contents: tmpContent,
            contents: [content[i]],
          },
        })

        // transporter.sendMail({
        //   from: "licklub@wielkopolskizpn.pl",
        //   to: recipientsEmails[i].email,
        //   subject: "WielkopolskiZPN - opłata za złożenie wniosku",
        //   html: `<p>test</p>`,

        // })
      );
      iterationCount++;
      //console.log("response", response.statusText);
    }

    Promise.all(promises)
      .then(async (response) => {
        await prisma.messages.update({
          where: {
            id: parseInt(message.id),
          },
          data: {
            send_date: getCurrentDate(),
          },
        });

        //console.log("data", recipientsEmails);
        res.send("email sended");
      })
      .catch((err) => {
        console.log(err.response?.data || err);
        res.status(400);
        res.json({
          type: "error",
          message: err,
        });
      });

    // console.log(err);

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
