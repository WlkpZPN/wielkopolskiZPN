import prisma from '../../../middleware/prisma';
import emailTemplate from '../../../middleware/emailTemplate';
import { getCurrentDate } from '../../../middleware/utils';
import nodemailer from 'nodemailer';
import smtpConfig from '../../../smtpConfig'; // Import SMTP configuration

// Create transporter using config values
const transporter = nodemailer.createTransport({
  host: smtpConfig.host,
  port: smtpConfig.port,
  secure: false, // If STARTTLS is enabled, this must be false
  auth: {
    user: smtpConfig.username,
    pass: smtpConfig.password,
  },
  tls: {
    rejectUnauthorized: true,
  },
});

export default (req, res) => {
  return new Promise(async (resolve) => {
    const { message, recipients, title } = req.body;

    let clubs = [];
    switch (recipients) {
      case 'aktywne':
        clubs = await prisma.clubs.findMany({
          where: { active: true },
        });
        break;
      case 'niekatywne':
        clubs = await prisma.clubs.findMany({
          where: { active: false },
        });
        break;
      case 'nierozpoczęte':
        clubs = await prisma.clubs.findMany({
          where: {
            OR: [{ applications: { none: {} } }, { applications: { every: { status_id: 1 } } }],
            NOT: [{ leauge: null }],
            active: true,
          },
        });
        break;
      case 'zatwierdzone':
        clubs = await prisma.clubs.findMany({
          where: {
            applications: {
              every: {
                OR: [{ status_id: 2 }, { status_id: 3 }],
              },
            },
          },
        });
        break;
      case 'wszystkie':
        clubs = await prisma.clubs.findMany();
        break;
    }

    console.log('Selected clubs count:', clubs.length);

    const promises = clubs.map(async (club) => {
      if (!club.email) return Promise.resolve(); // Skip if email is missing

      // Using nodemailer to send an email
      const mailOptions = {
        from: `"Wielkopolski ZPN" <${smtpConfig.username}>`,
        to: club.email,
        subject: title,
        html: emailTemplate(title, message.message), // Use your email template
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to: ${club.email}`);
      } catch (error) {
        console.error(`Failed to send email to: ${club.email}`, error);
      }
    });

    // Execute all email-sending promises
    Promise.all(promises)
      .then(async () => {
        await prisma.messages.update({
          where: {
            id: parseInt(message.id),
          },
          data: {
            send_date: getCurrentDate(),
          },
        });

        res.send('Emails sent successfully!');
        resolve();
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          type: 'error',
          message: 'Failed to send some emails. Check logs for details.',
        });
        resolve();
      });
  });
};
