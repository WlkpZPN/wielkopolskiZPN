import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: "serwer1710802.home.pl",
//   port: 465,
//   auth: {
//     user: "licklub@wielkopolskizpn.pl",
//     pass: "licencje2020",
//   },
// });

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d6b6955cf480dd",
    pass: "fb302668d87e65",
  },
});

export default transporter;
