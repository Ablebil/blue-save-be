import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import {
  findUserByEmail,
  createUser,
  updateUser,
  addRefreshToken,
  removeRefreshToken,
  findUserByRefreshToken,
  getUserRefreshTokens,
  findUserByGoogleId,
  findUserByResetToken,
  deleteUser,
} from "../repositories/authRepository";
import {
  generateAccessToken,
  generateRefreshToken,
  generateOTP,
} from "../utils/jwt";
import { sendOTPEmail, sendResetLink } from "../utils/email";
import HttpError from "../utils/HttpError";
import { Role } from "../types";

export const authenticateGoogleUser = async (profile: any) => {
  const email = profile.emails?.[0]?.value!;

  let user = await findUserByGoogleId(profile.id);

  if (!user) {
    user = await findUserByEmail(email);

    if (user) {
      console.log("User found with the same email, adding Google ID");

      if (!user.verified) {
        user = await updateUser(
          { email },
          { googleId: profile.id, verified: true }
        );
      } else {
        user = await updateUser({ email }, { googleId: profile.id });
      }
    } else {
      console.log("User not found, creating a new account with Google");
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
  await addRefreshToken(user!.id, refreshToken);

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

  if (user) {
    if (user.googleId && !user.password) {
      console.log("User has registered with Google, adding password and OTP");

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

      return await sendOTPEmail(email, otp);
    } else {
      throw new HttpError("Email already registered", 409);
    }
  }

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
};

export const verifyOTP = async (email: string, otp: string) => {
  const user = await findUserByEmail(email);
  if (!user) throw new HttpError("User not found", 404);
  if (
    !user.otp ||
    user.otp !== otp ||
    Date.now() > user.otpExpiresAt!.getTime()
  ) {
    throw new HttpError("Invalid or expired OTP", 400);
  }

  const refreshToken = generateRefreshToken(user.id);
  await addRefreshToken(user.id, refreshToken);

  await updateUser(
    { email },
    {
      otp: null,
      otpExpiresAt: null,
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
  if (!user || !(await bcrypt.compare(password, user.password as string)))
    throw new HttpError("Incorrect email or password", 401);
  if (!user.verified) throw new HttpError("Account not verified", 403);

  const refreshToken = generateRefreshToken(user.id, rememberMe);

  const refreshTokens = await getUserRefreshTokens(user.id);
  if (refreshTokens.length >= 2) {
    await removeRefreshToken(refreshTokens[0].token);
  }

  await addRefreshToken(user.id, refreshToken);

  return {
    accessToken: generateAccessToken(user.id),
    refreshToken,
  };
};

export const refreshAccessToken = async (refreshToken: string) => {
  const user = await findUserByRefreshToken(refreshToken);

  if (!user) throw new HttpError("Invalid refresh token", 403);

  try {
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);

    const newRefreshToken = generateRefreshToken(user.id);
    await removeRefreshToken(refreshToken);
    await addRefreshToken(user.id, newRefreshToken);

    return {
      accessToken: generateAccessToken(user.id),
      refreshToken: newRefreshToken,
    };
  } catch (err) {
    throw new HttpError("Invalid or expired refresh token", 403);
  }
};

export const logoutUser = async (refreshToken: string) => {
  const user = await findUserByRefreshToken(refreshToken);
  if (!user) throw new HttpError("Invalid refresh token", 403);

  await removeRefreshToken(refreshToken);
};

export const requestPasswordReset = async (email: string) => {
  const user = await findUserByEmail(email);
  if (!user) throw new HttpError("User not found", 404);

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedResetToken = await bcrypt.hash(resetToken, 10);
  const expiry = new Date(Date.now() + 60 * 60 * 1000);

  await updateUser(
    { email },
    { resetToken: hashedResetToken, resetTokenExpiresAt: expiry }
  );

  await sendResetLink(email, resetToken);
};

export const resetPassword = async (
  resetToken: string,
  newPassword: string
) => {
  const user = await findUserByResetToken(resetToken);

  if (
    !user ||
    !user.resetToken ||
    !user.resetTokenExpiresAt ||
    user.resetTokenExpiresAt.getTime() < Date.now()
  )
    throw new HttpError("Invalid or expired reset token", 403);

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await updateUser(
    { id: user.id },
    { password: hashedPassword, resetToken: null, resetTokenExpiresAt: null }
  );
};

export const deleteUserById = async (userId: string) => {
  return await deleteUser(userId);
};
