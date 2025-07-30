import prisma from '../../../middleware/prisma';
import transporter from '../../../middleware/transporter';
import axios from 'axios';
import emailTemplate from '../../../middleware/emailTemplate';
import { getCurrentDate } from '../../../middleware/utils';
import smtpConfig from '../../../smtpConfig';
export default (req, res) => {
  return new Promise(async (resolve) => {
    const { clubEmail } = req.body;

    // let promises = [];

    const club = await prisma.clubs.findFirst({
      where: {
        email: clubEmail,
      },
      select: {
        email: true,
        password: true,
      },
    });

    try {
      transporter.sendMail({
        from: `"Wielkopolski ZPN" <${smtpConfig.username}>`,
        to: club.email,
        subject: 'Dane dostępowe do Platformy Licencyjnej',
        html: `<html lang="pl"><head>
  
</head>

<body style="font-family: 'Lato', sans-serif; font-weight: 700; color: #000">
    
Dzień dobry, <br/><br/>

Poniżej przesyłamy dane dla klubu do logowania do platformy licencyjnej uruchomionej celem składania wniosków licencyjnych wraz z załącznikami na sezon 2021/2022 i kolejne. Począwszy od tego roku jest to jedyna możliwa forma przesyłania aplikacji.
<br/><br/>
Platforma licencyjna: http://licencje.wielkopolskizpn.pl<br/>
Login: ${club.email}<br/>
Hasło: ${club.password}<br/><br/>

Procedura licencyjna jest już dostępna. Co bardzo istotne, system umożliwia zapisywanie kopii roboczych. Możliwe jest zatem wypełnienie wniosku o dane, co do których mają Państwo pewność, a następnie zapis postępu prac i uzupełnienie wniosku oraz wysłanie w terminie późniejszym. 
<br/><br/>
Przypominamy, że wszystkie Kluby mają obowiązek złożyć wnioski w terminie do 31 maja, zgodnie z klasą rozgrywkową, w której występuje pierwsza drużyna w obecnym sezonie.
 <br/><br/>
W razie pytań lub wątpliwości prosimy o kontakt na licklub@wielkopolskizpn.pl.
    
</body></html>`,
      });
      // console.log(description, email);
      res.send('email send');
      return resolve();
    } catch (e) {
      res.status(400);
      console.log(e);
      res.send('Email sending error');
    }

    //     promises.push(
    //       axios({
    //         url: "https://api.freshmail.com/v3/messaging/emails",
    //         method: "POST",
    //         headers: {
    //           Authorization: `Bearer ${process.env.FRESHMAIL_TOKEN}`,
    //           "Content-Type": "application/json",
    //         },
    //         data: {
    //           //recipients: tmpRecipients,
    //           recipients: [
    //             {
    //               email: club.email,
    //             },
    //           ],
    //           from: {
    //             name: "Wielkopolski ZPN",
    //             email: "licklub@wielkopolskizpn.pl",
    //           },
    //
    //           subject:
    //             "Dane dostępowe do Platformy Licencyjnej Wielkopolskiego ZPN",
    //           // contents: tmpContent,
    //           contents: [
    //             {
    //               type: "text/html",
    //               body: emailTemplate(
    //                 "Dane dostępowe do Platformy Licencyjnej",
    //                 `Dzień dobry, <br/><br/>
    //
    // Poniżej przesyłamy dane dla klubu do logowania do platformy licencyjnej uruchomionej celem składania wniosków licencyjnych wraz z załącznikami na sezon 2021/2022 i kolejne. Począwszy od tego roku jest to jedyna możliwa forma przesyłania aplikacji.
    // <br/><br/>
    // Platforma licencyjna: http://licencje.wielkopolskizpn.pl<br/>
    // Login: ${club.email}<br/>
    // Hasło: ${club.password}<br/><br/>
    //
    // Procedura licencyjna jest już dostępna. Co bardzo istotne, system umożliwia zapisywanie kopii roboczych. Możliwe jest zatem wypełnienie wniosku o dane, co do których mają Państwo pewność, a następnie zapis postępu prac i uzupełnienie wniosku oraz wysłanie w terminie późniejszym.
    // <br/><br/>
    // Przypominamy, że wszystkie Kluby mają obowiązek złożyć wnioski w terminie do 31 maja, zgodnie z klasą rozgrywkową, w której występuje pierwsza drużyna w obecnym sezonie.
    //  <br/><br/>
    // W razie pytań lub wątpliwości prosimy o kontakt na licklub@wielkopolskizpn.pl.`
    //               ),
    //             },
    //           ],
    //         },
    //       })
    //     );

    // Promise.all(promises)
    //   .then(async (response) => {
    //     console.log(response);
    //     res.send("email sended");
    //   })
    //   .catch((err) => {
    //     console.log(err.response?.data || err);
    //     res.status(400);
    //     res.json({
    //       type: "error",
    //       message: err,
    //     });
    //   });

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
