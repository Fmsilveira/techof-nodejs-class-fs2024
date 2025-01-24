const nodemailer = require('nodemailer');

const {
  MAILTRAP_USER,
  MAILTRAP_PASSWORD,
  MAILTRAP_HOST,
} = process.env

const sendForgotPasswordEmail = async ({
  resetPasswordToken,
  email,
}) => {
  const transport = nodemailer.createTransport({
    host: MAILTRAP_HOST,
    port: 2525,
    auth: {
      user: MAILTRAP_USER,
      pass: MAILTRAP_PASSWORD
    }
  });

  const info = await transport.sendMail({
    from: '"Bruno Hirata" <bruno.hirata@techof.pt>',
    to: email,
    subject: 'Reset password requested',
    text: `Reset password token: ${resetPasswordToken}`,
    html: `Reset password token: <b>${resetPasswordToken}</b>`,
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = {
  sendForgotPasswordEmail,
}
