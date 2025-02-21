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

export const authenticateGoogleUser = async (profile: any) => {
  const email = profile.emails?.[0]?.value!;

  let user = await findUserByGoogleId(profile.id);

  if (user) {
    if (!user.googleId) {
      user = await updateUser({ email }, { googleId: profile.id });
    }
  } else {
    user = await createUser({
      googleId: profile.id,
      email,
      name: profile.displayName,
    });
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
  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new HttpError("Email sudah terdaftar", 409);

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = generateOTP();

  const user = await createUser({
    email,
    password: hashedPassword,
    name,
    otp,
    otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000),
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
    }
  );

  return {
    accessToken: generateAccessToken(user.id),
    refreshToken,
  };
};

export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (
    !user ||
    !user.password ||
    !(await bcrypt.compare(password, user.password))
  ) {
    throw new HttpError("Email atau password salah", 401);
  }

  const refreshToken = generateRefreshToken(user.id);

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
