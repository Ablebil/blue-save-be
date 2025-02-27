import { NextFunction, Request, Response } from "express";
import {
  registerUser,
  verifyOTP,
  loginUser,
  refreshAccessToken,
  logoutUser,
  requestPasswordReset,
  resetPassword,
} from "../services/authService";
import { matchedData } from "express-validator/lib";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = matchedData(req);
    const name = email
      .substring(0, email.indexOf("@"))
      .replace(/^./, (c: string) => c.toUpperCase());
    await registerUser(email, password, name);
    res.status(201).json({ message: "OTP has been sent to email" });
  } catch (err) {
    next(err);
  }
};

export const verify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp } = matchedData(req);
    const { accessToken, refreshToken } = await verifyOTP(email, otp);
    res.status(200).json({
      message: "Verification successful",
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, rememberMe } = matchedData(req);
    const { accessToken, refreshToken } = await loginUser(
      email,
      password,
      rememberMe
    );
    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

export const googleAuthCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Google login failed" });
      return;
    }

    const { user, accessToken, refreshToken } = req.user as any;

    res.status(200).json({
      message: "Google login successful",
      user,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

export const refreshTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = matchedData(req);
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await refreshAccessToken(refreshToken);
    res
      .status(200)
      .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = matchedData(req);

    await logoutUser(refreshToken);

    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = matchedData(req);
    await requestPasswordReset(email);
    res
      .status(200)
      .json({ message: "Password reset link has been sent to email" });
  } catch (err) {
    next(err);
  }
};

export const resetPasswordHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { resetToken, newPassword } = matchedData(req);
    await resetPassword(resetToken, newPassword);
    res.status(200).json({ message: "Password has been updated successfully" });
  } catch (err) {
    next(err);
  }
};
