import prisma from '../../../middleware/prisma';
import nodemailer from 'nodemailer';
import { getCurrentDate } from '../../../middleware/utils';
import smtpConfig from '../../../smtpConfig';
var transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'd6b6955cf480dd',
    pass: 'fb302668d87e65',
  },
});

export default (req, res) => {
  return new Promise(async (resolve) => {
    const newStatus = req.body.order.status;
    const paymentID = req.body.order.extOrderId;
    const email = req.body.order?.buyer.email;
    console.log('NOTIFY ROUTE FIRED');
    console.log(req.body);

    const application = await prisma.applications.findUnique({
      where: {
        payment_id: paymentID,
      },
    });
    if (newStatus === 'COMPLETED' && application.status_id == 6) {
      await prisma.applications.update({
        where: {
          payment_id: paymentID,
        },
        data: {
          status_id: 7,
        },
      });
      await prisma.histories.create({
        data: {
          application_id: parseInt(application.id),
          created_at: getCurrentDate(),
          description: 'Płatność zaakceptowana',
          status_id: 7,
        },
      });
      if (email) {
        transporter.sendMail({
          from: `"Wielkopolski ZPN" <${smtpConfig.username}>`,
          to: email,
          subject: 'WielkopolskiZPN - opłata za złożenie wniosku',
          html: `<head>
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap" rel="stylesheet" />
</head>

<body style="font-family: 'Lato', sans-serif">
  <main>
    <table style="
        width: min-content;
        margin: 16px auto;

        max-width: 650px;
        width: 100%;
      ">
      <tr>
        <td style="padding: 32px 48px">
          <img
            src="https://licencje.wielkopolskizpn.pl/wzpn_logo.png"
            alt="Wielkopolski Związek Piłki Nożnej"
            style= 'width={150} height={50}'
          />
        </td>
      </tr>
      <tr style="padding: 0">
        <td style="margin: 0; padding: 16px 48px; background-color: #0156a6">
          <h1 style="margin: 0; padding: 0; color: white">Dziękujemy za dokonanie płatności</h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 32px 48px">
          <p style="margin:24px 0; max-width:400px; font-weight:bold; color:rgba(0,0,0,0.7">
            Twoja płatność przebiegła pomyślnie, niedługo dostaniesz maila z decyzją Wielkopolskiego ZPN o wystawieniu
            licencji.
          </p>
          <p style=" max-width:400px; font-weight:bold; color:rgba(0,0,0,0.7">W razie pytań zapraszamy do
            kontaktu,zachęcamy też do zalogowania się na nasz serwis liencyjny w celu
            sprawdzenia zakładki FAQ</p>
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding: 24px 48px">
          <a style="
              padding: 8px 32px;
              text-decoration: none;
              color: white;
              font-weight: bold;
              background: #0156a6;
              border-radius: 4px;
            " href="https://licencje.wielkopolskizpn.pl">Platforma licencyjna</a>
        </td>
      </tr>
      <tr>
        <td style="
            padding: 32px 48px;
            width: 50%;
          ">
          <p>Z poważaniem,</p>
          <p style="margin: 2px 0">Wielkopolski Związek Piłki Nożnej</p>
          <p style="margin: 2px 0">ul. Warmińska 1</p>
          <p style="margin: 2px 0">60-622 Poznań</p>

          <a
            style="color: #0156a6; text-decoration: none; margin: 16px 0 4px 0"
            href="mailto:licklub@wielkopolskizpn.pl"
            >licklub@wielkopolskizpn.pl</a
          >
          <a
            style="color: #0156a6; text-decoration: none"
            href="https://wielkopolskizpn.pl/"
            target="_blank"
            >www.wielkopolskizpn.pl</a
          >
          <p style="margin: 4px 0">+48 600 437 114</p>
        </td>
      </tr>
      <tfoot>
        <td style="height: 24px; width: 100%; background: #0156a6"></td>
      </tfoot>
    </table>
  </main>
</body>`,
        });
      }
    }

    res.status(200);
    res.send('OK');
    return resolve();
  });
};
