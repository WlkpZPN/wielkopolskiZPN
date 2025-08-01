import transporter from '../../../middleware/transporter';
import smtpConfig from '../../../smtpConfig';

// transporter.use(
//   "compile",
//   hbs({
//     viewEngine: "express-handlebars",
//     // viewPath: fs.readFileSync(path.join(__dirname, "mail.hbs"), "utf8"),
//     viewPath: "./pages/api/mails/views",
//   })
// );

export default (req, res) => {
  return new Promise(async (resolve) => {
    const { link, email } = req.body;

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
          <h1 style="font-weight:bold; margin: 0; padding: 0; color: white">Opłać swój wniosek licencyjny</h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 32px 48px">
        <p style='max-width:400px; color:rgba(0,0,0,0.8); font-weight:bold;'>

        Twój wniosek został zaakceptowany. 
Prosimy o dokonanie płatności klikając w poniższy link.
        </>
          <a href="${link}" style="margin-top:24px; background-image:url('http://static.payu.com/pl/standard/partners/buttons/payu_account_button_long_03.png');background-repeat:no-repeat;
          background-size:contain;display:block;height:40px;margin-bottom:24px;
          " ></a>
          Po zweryfikowaniu płatności wyślemy e-mail z decyzją Wielkopolskiego Związku Piłki Nożnej. Status swojego wniosku możesz również sprawdzić korzystając z Platformy Licencyjnej.
          </p>
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
            >www.wielkopolskizpn.pl
            </a>
          <p style="margin: 4px 0">+48 600 437 114</p>
        </td>
      </tr>
      <tfoot>
        <td style="height: 24px; width: 100%; background: #0156a6"></td>
      </tfoot>
    </table>
  </main>
</body>`,
      // template: "mail",
      // context: {
      //   content: "testowa wiadomosc",
      // },
    });
    res.send('email send');
    return resolve();
  });
};

//  <tr>
//    <td style="padding: 24px 48px">
//      <a
//        style="

//               text-decoration: none;
//               color: #1296D8;
//               font-weight: bold;

//             "
//        href="https://licencje.wielkopolskizpn.pl/"
//      >
//        Platforma Licencyjna
//      </a>
//    </td>
//  </tr>;
