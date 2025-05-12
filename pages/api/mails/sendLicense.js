import { generatePdf } from "../../../middleware/generatePdf";
import transporter from "../../../middleware/transporter";
import { getCurrentDate } from "../../../middleware/utils";
export default (req, res) => {
  return new Promise(async (resolve) => {
    const { clubData } = req.body;
    const date = getCurrentDate().split(",")[0];
    //console.log(clubData);
    const license = await generatePdf(clubData, date, false);

    transporter.sendMail({
      attachments: [
        {
          filename: `${clubData.internal_id}_licencja.pdf`,
          content: new Buffer.from(license),
        },
      ],
      from: "licklub@wielkopolskizpn.pl",
      to: clubData.email,
      subject: "WielkopolskiZPN - licencja pomyślnie wydana",
      // attachments: [
      //   {
      //     fileName:''
      //   }
      // ],
      html: `<head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body style="font-family: 'Lato', sans-serif">
        <main>
          <table
            style="
              width: min-content;
              margin: 16px auto;

              max-width: 650px;
              width: 100%;
            "
          >
            <tr>
              <td style="padding: 32px 48px">
                <img src={'/wzpn_logo.png'} alt={'logo'} width={150} height={50} />
              </td>
            </tr>
            <tr style="padding: 0">
              <td style="margin: 0; padding: 16px 48px; background-color: #0156a6">
                <h1 style="margin: 0; padding: 0; color: white">
                  Twój klub otrzymał licencję
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 32px 48px">
                <p
                  style="
                    max-width: 450px;
                    color: rgba(0, 0, 0, 0.8);
                    font-weight: bold;
                  "
                >
                  Twój wniosek licencyjny został pomyślnie zaakceptowany.
                  Twój klub posiada uprawnienia umożliwiające udział w rozgrywkach w najbliższym sezonie.
                </p>
                <p
                  style="
                    max-width: 450px;
                    color: rgba(0, 0, 0, 0.8);
                    font-weight: bold;
                  "
                >
                  Licencja znajduje się w załączniku, ale można ją także pobrać z poziomu platformy licencyjnej - link znajdziesz poniżej.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 24px 48px">
                <a
                  style="
                   
                    text-decoration: none;
                    color: #1296D8;
                    font-weight: bold;
                   
                  "
                  href="wielkopolski-zpn-wielkopolskizpn.vercel.app"
                  >Platforma Licencyjna</a
                >
              </td>
            </tr>
            <tr>
              <td
                style="
                  padding: 32px 48px;
                  display: flex;
                  flex-direction: column;
                  width: 50%;
                "
              >
                 <p>Z poważaniem,</p>
          <p style="margin: 2px 0">Wielkopolski Związek Piłki Nożnej</p>
          <p style="margin: 2px 0">ul. Warmińska 1</p>
          <p style="margin: 2px 0">60-622 Poznań</p>

          <a
            style="color: #0156a6; text-decoration: none; margin: 16px 0 4px 0"
            href="mailto:sekretariat@wielkopolskizpn.pl"
            >sekretariat@wielkopolskizpn.pl</a
          >
          <a
            style="color: #0156a6; text-decoration: none"
            href="https://wielkopolskizpn.pl/"
            target="_blank"
            >www.wielkopolskizpn.pl</a
          >
          <p style="margin: 4px 0">+ 61 679 48 30</p>
              </td>
            </tr>
            <tfoot>
              <td style="height: 24px; width: 100%; background: #0156a6"></td>
            </tfoot>
          </table>
        </main>
      </body>
      `,
    });

    res.send("mail sent");
    return resolve();
  });
};
