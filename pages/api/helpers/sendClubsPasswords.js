import prisma from '../../../middleware/prisma';
import transporter from '../../../middleware/transporter';
import axios from 'axios';
import emailTemplate from '../../../middleware/emailTemplate';
import { getCurrentDate } from '../../../middleware/utils';
export default (req, res) => {
  return new Promise(async (resolve) => {
    const { message, recipients, title } = req.body;

    //1. check the rule for clubs
    //2. get all clubs that met conditions
    // console.log("message", message);

    const clubs = await prisma.clubs.findMany();

    let recipientsEmails = [];
    let content = [];
    console.log('clubs', clubs.length);
    clubs.forEach((club, index) => {
      let i = 0;

      recipientsEmails.push({
        email: club.email,

        //name: club.name.replace(/\r?\n|\r/g, " ") || "",
      });
      content.push({
        type: 'text/html',

        body: emailTemplate(
          'Dane dostępowe do Platformy Licencyjnej',
          `Dzień dobry, <br/><br/>

Poniżej przesyłamy dane dla klubu do logowania do platformy licencyjnej uruchomionej celem składania wniosków licencyjnych wraz z załącznikami na sezon 2021/2022 i kolejne. Począwszy od tego roku jest to jedyna możliwa forma przesyłania aplikacji.
<br/><br/>
Platforma licencyjna: http://licencje.wielkopolskizpn.pl<br/>
Login: ${club.email}<br/>
Hasło: ${club.password}<br/><br/>

Procedura licencyjna jest już dostępna. Co bardzo istotne, system umożliwia zapisywanie kopii roboczych. Możliwe jest zatem wypełnienie wniosku o dane, co do których mają Państwo pewność, a następnie zapis postępu prac i uzupełnienie wniosku oraz wysłanie w terminie późniejszym. 
<br/><br/>
Przypominamy, że wszystkie Kluby mają obowiązek złożyć wnioski w terminie do 31 maja, zgodnie z klasą rozgrywkową, w której występuje pierwsza drużyna w obecnym sezonie.
 <br/><br/>
W razie pytań lub wątpliwości prosimy o kontakt na licklub@wielkopolskizpn.pl.`,
        ),
      });
    });

    let i;

    let promises = [];
    let iterationCount = 0;

    for (i = 0; i < clubs.length; i++) {
      if (!recipientsEmails[i].email) {
        continue;
      }
      promises.push(
        axios({
          url: 'https://api.freshmail.com/v3/messaging/emails',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.FRESHMAIL_TOKEN}`,
            'Content-Type': 'application/json',
          },
          data: {
            //recipients: tmpRecipients,
            recipients: [recipientsEmails[i]],
            from: {
              name: 'Wielkopolski ZPN',
              email: 'licklub@wielkopolskizpn.pl',
            },

            subject: 'Dane dostępowe do Platformy Licencyjnej Wielkopolskiego ZPN',
            // contents: tmpContent,
            contents: [content[i]],
          },
        }),
      );
      iterationCount++;
    }

    Promise.all(promises)
      .then(async (response) => {
        //console.log("data", recipientsEmails);
        res.send('email sended');
      })
      .catch((err) => {
        console.log(err.response?.data || err);
        res.status(400);
        res.json({
          type: 'error',
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
