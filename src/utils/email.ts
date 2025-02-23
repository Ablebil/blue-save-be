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
    subject: "Kode OTP Verifikasi Akun",
    text: `Kode OTP Anda adalah: ${otp}. Kode ini berlaku selama 5 menit.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP has been sent to ${email}`);
  } catch (err: any) {
    throw new HttpError(`Gagal mengirim email: ${err.message}`, 500);
  }
};

export const sendResetLink = async (email: string, resetToken: string) => {
  const resetLink = `http://localhost:5000/api/v1/auth/reset-password?resetToken=${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Link Reset Password",
    text: `Berikut adalah link untuk reset password: ${resetLink}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Link has been sent to ${email}`);
  } catch (err: any) {
    throw new HttpError(`Gagal mengirim email ${err.message}`, 500);
  }
};
