import nodemailer from 'nodemailer';
import smtpConfig from '../smtpConfig';

const transporter = nodemailer.createTransport({
  host: smtpConfig.host,
  port: smtpConfig.port,
  auth: {
    user: smtpConfig.username,
    pass: smtpConfig.password,
  },
});

export default transporter;
