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
