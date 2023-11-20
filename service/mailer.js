import "dotenv/config";
import { createTransport } from "nodemailer";

const config = {
  pool: true,
  host: process.env.NODEMAILER_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_AUTH_USER,
    pass: process.env.NODEMAILER_AUTH_PASS,
  },
};

const sendEmail = async ({ to, verificationToken }) => {
  const transporter = createTransport(config);
  const emailOptions = {
    from: process.env.NODEMAILER_AUTH_USER,
    to,
    subject: "Email verification link",
    text: `Hello! Your email verification link: /users/verify/${verificationToken}`,
  };
  return await transporter
    .sendMail(emailOptions)
    .then((info) => {
      console.log(info);
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export default sendEmail;
