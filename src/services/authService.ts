import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  findUserByEmail,
  createUser,
  updateUser,
  findUserByRefreshToken,
  findUserByGoogleId,
} from "../repositories/authRepository";
import {
  generateAccessToken,
  generateRefreshToken,
  generateOTP,
} from "../utils/jwt";
import { sendOTPEmail } from "../utils/email";
import HttpError from "../utils/HttpError";
import { Role } from "../types";

export const authenticateGoogleUser = async (profile: any) => {
  const email = profile.emails?.[0]?.value!;

  let user = await findUserByGoogleId(profile.id);

  if (!user) {
    user = await findUserByEmail(email);

    if (user) {
      console.log(
        "User ditemukan dengan email yang sama, menambahkan Google ID"
      );

      if (!user.verified) {
        user = await updateUser(
          { email },
          { googleId: profile.id, verified: true }
        );
      } else {
        user = await updateUser({ email }, { googleId: profile.id });
      }
    } else {
      console.log("User tidak ditemukan, membuat akun baru dengan Google");
      user = await createUser({
        googleId: profile.id,
        email,
        name: profile.displayName,
        role: Role.USER,
        verified: true,
      });
    }
  }

  const refreshToken = generateRefreshToken(user!.id);
  await updateUser({ id: user!.id }, { refreshToken });

  return {
    user,
    accessToken: generateAccessToken(user!.id),
    refreshToken,
  };
};

export const registerUser = async (
  email: string,
  password: string,
  name: string
) => {
  let user = await findUserByEmail(email);

  if (user && user.googleId && !user.password) {
    console.log(
      "User telah mendaftar dengan Google, menambahkan password dan OTP"
    );

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    user = await updateUser(
      { email },
      {
        password: hashedPassword,
        otp,
        otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000),
      }
    );

    await sendOTPEmail(email, otp);

    return { message: "OTP telah dikirim ke email" };
  }

  if (user) throw new HttpError("Email sudah terdaftar", 409);

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = generateOTP();

  user = await createUser({
    email,
    password: hashedPassword,
    name,
    otp,
    otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000),
    role: Role.USER,
  });

  await sendOTPEmail(email, otp);

  return { message: "OTP telah dikirim ke email" };
};

export const verifyOTP = async (email: string, otp: string) => {
  const user = await findUserByEmail(email);
  if (!user) throw new HttpError("User tidak ditemukan", 404);
  if (
    !user.otp ||
    user.otp !== otp ||
    Date.now() > user.otpExpiresAt!.getTime()
  ) {
    throw new HttpError("OTP tidak valid atau sudah kadaluwarsa", 400);
  }

  const refreshToken = generateRefreshToken(user.id);

  await updateUser(
    { email },
    {
      otp: null,
      otpExpiresAt: null,
      refreshToken,
      verified: true,
    }
  );

  return {
    accessToken: generateAccessToken(user.id),
    refreshToken,
  };
};

export const loginUser = async (
  email: string,
  password: string,
  rememberMe: boolean = false
) => {
  const user = await findUserByEmail(email);
  if (!user) throw new HttpError("User tidak ditemukan", 404);
  if (!(await bcrypt.compare(password, user.password as string)))
    throw new HttpError("Password salah", 401);
  if (!user.verified) throw new HttpError("Akun beblum diverifikasi", 403);

  const refreshToken = generateRefreshToken(user.id, rememberMe);

  await updateUser({ email }, { refreshToken });

  return {
    accessToken: generateAccessToken(user.id),
    refreshToken,
  };
};

export const refreshAccessToken = async (refreshToken: string) => {
  const user = await findUserByRefreshToken(refreshToken);

  if (!user) throw new HttpError("Refresh token tidak valid", 403);

  try {
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);

    const newRefreshToken = generateRefreshToken(user.id);
    await updateUser({ email: user.email }, { refreshToken: newRefreshToken });

    return {
      accessToken: generateAccessToken(user.id),
      refreshToken: newRefreshToken,
    };
  } catch (err) {
    throw new HttpError("Refresh token tidak valid atau kadaluwarsa", 403);
  }
};

export const logoutUser = async (refreshToken: string) => {
  const user = await findUserByRefreshToken(refreshToken);

  if (!user) throw new HttpError("Refresh token tidak valid", 403);

  try {
    await updateUser({ email: user.email }, { refreshToken: null });
  } catch (err) {
    throw new HttpError("Refresh token tidak valid atau kadaluwarsa", 403);
  }
};
