import nodemailer from "nodemailer";
import HttpError from "./HttpError";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (email: string, otp: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Account Verification OTP Code",
    text: `Your OTP code is: ${otp}. This code is valid for 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP has been sent to ${email}`);
  } catch (err: any) {
    throw new HttpError(`Failed to send email: ${err.message}`, 500);
  }
};

export const sendResetLink = async (email: string, resetToken: string) => {
  const resetLink = `http://localhost:5000/api/v1/auth/reset-password?resetToken=${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Link",
    text: `Here is the link to reset your password: ${resetLink}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Link has been sent to ${email}`);
  } catch (err: any) {
    throw new HttpError(`Failed to send email: ${err.message}`, 500);
  }
};
