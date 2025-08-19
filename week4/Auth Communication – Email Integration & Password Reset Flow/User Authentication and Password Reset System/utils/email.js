const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: process.env.SMTP_PORT || 587,
  auth: {
    user: process.env.SMTP_USER || 'your_ethereal_user',
    pass: process.env.SMTP_PASS || 'your_ethereal_pass',
  },
});

const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: process.env.SMTP_FROM || 'no-reply@example.com',
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
