import prisma from "../../../middleware/prisma";
import transporter from "../../../middleware/transporter";
import axios from "axios";
import emailTemplate from "../../../middleware/emailTemplate";
export default (req, res) => {
  return new Promise(async (resolve) => {
    const { message, recipients, title } = req.body;
    let clubs = [];
    //1. check the rule for clubs
    //2. get all clubs that met conditions

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

        recipientsEmails[i].push({
          name: club.name,
          email: club.email,
        });
        content[i].push({
          type: "text/html",
          body: emailTemaplate(title, message),
        });
      });

      let i,
        tmpRecipients,
        tmpContent,
        chunk = 100;
      for (i = 0, j = recipientsEmails.length; i < j; i += chunk) {
        tmpRecipients = recipientsEmails.slice(i, i + chunk);
        tmpContent = content.slice(i, i + chunk);
        // do whatever

        await axios({
          mathod: "POST",
          headers: {
            Authorization: `Bearer ${process.env.FRESHMAIL_TOKEN}`,
            "Content-Type": "application/json",
          },
          data: {
            from: {
              email: "licklub@wielkopolskizpn.pl",
              name: "Wielkopolski ZPN",
            },
            recipients: recipientsEmails,
            subject: title,
            contents: content,
          },
        });
      }
    } catch (err) {
      console.log(err);
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

    res.send("test");
    //3. send maild to all that clubs
    await prisma.$disconnect();
  });
};
