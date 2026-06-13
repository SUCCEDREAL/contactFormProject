import nodemailer from "nodemailer";

// create a transporter
export const sendEmail = async (option) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    family: 4,
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: option.to,
      subject: option.subject,
      html: option.html,
    });
    console.log("Email sent");
  } catch (error) {
    console.log("EMAIL ERROR:", err);
  }
};
