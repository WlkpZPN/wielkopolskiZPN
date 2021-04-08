import bcrypt from "bcrypt";
import prisma from "../../../middleware/prisma";
import transporter from "../../../middleware/transporter";
const saltRounds = 10;

export default (req, res) => {
  return new Promise(async (resolve) => {
    const { clubEmail } = req.body;
    try {
      const clubData = await prisma.clubs.findUnique({
        where: {
          email: clubEmail,
        },
      });
      console.log(clubData);

      if (!clubData) {
        res.status(400).send("Klub z podanym mailem nie istnieje");
        return resolve();
      }

      await transporter.sendMail({
        from: "licklub@wielkopolskizpn.pl",
        to: clubData.email,
        subject: "WielkopolskiZPN - przypomnienie hasła",
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
          <img
            src="https://cdn.bsbox.pl/files/wzpn/YjU7MDA_/2536b28051ecaf0c109bc801d3503d86_original_images.png"
            alt="WIELKOPOLSKI ZWIĄZEK PIŁKI NOŻNEJ"
            style="max-width: 160px"
          />
        </td>
      </tr>
      <tr style="padding: 0">
        <td style="margin: 0; padding: 16px 48px; background-color: #0156a6">
          <h1 style="margin: 0; padding: 0; color: white">
            Twoje hasło do Platformy Licencyjnej
          </h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 32px 48px">
          Poniżej znajduje się twoje nowe hasło do Platformy Licencyjnej Wielkopolskiego Związku Piłki Nożnej. 
          Aby się zalogować wprowadź swój adres e-mail,
           na który otrzymałeś tą wiadomość oraz wprowadź hasło znajdujące się poniżej:
          <p><span style="font-weight: bold">hasło:</span> ${clubData.password}</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 24px 48px">
          <a
            style="
             
              text-decoration: none;
              color: black;
              font-weight: bold;
             
            "
            href=""
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
          <p style="margin: 2px 0">ul.Warmińska 1</p>
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
            >www.wielkopolskizpn.pl/</a
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

      res.send("Hasło wysłane");
    } catch (err) {
      console.log(err);
      res.status(400).send("Something went wrong");
    }
  });
};
