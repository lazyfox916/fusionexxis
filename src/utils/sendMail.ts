import nodemailer, { SendMailOptions } from "nodemailer";
import { SMTP_EMAIL, SMTP_PASS } from "../config/env";
import { AppError } from "./AppError";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Error:", error);
  } else {
    console.log("SMTP Server is ready");
  }
});

export async function sendMail(mailInfo: SendMailOptions) {
  try {
    const info = await transporter.sendMail(mailInfo);

    console.log("Email sent:", info.messageId);

    return info;
  } catch (error: any) {
    console.error("Email send failed:", error);

    throw new AppError(error.message || "Email sending failed", 500);
  }
}
