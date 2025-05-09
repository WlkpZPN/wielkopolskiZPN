// config/smtpConfig.js

const smtpConfig = {
  host: "serwer1710802.home.pl",
  port: 587,
  username: "no-reply@wielkopolskizpn.pl",
  password: "PVMnPKA8Tef",
  protocol: "smtp",
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
  defaultEncoding: "UTF-8",
};

module.exports = smtpConfig;