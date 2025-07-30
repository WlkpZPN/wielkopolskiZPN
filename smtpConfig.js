// config/smtpConfig.js
require('dotenv').config();

const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: 587,
  username: process.env.SMTP_USERNAME,
  password: process.env.SMTP_PASSWORD,
  protocol: 'smtp',
  properties: {
    mail: {
      smtp: {
        auth: true,
        starttls: {
          enable: true,
        },
      },
    },
  },
  defaultEncoding: 'UTF-8',
};

module.exports = smtpConfig;
