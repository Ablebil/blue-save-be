import { NextFunction, Request, Response } from "express";
import {
  registerUser,
  verifyOTP,
  loginUser,
  refreshAccessToken,
} from "../services/authService";
import { matchedData } from "express-validator/lib";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = matchedData(req);
    const otp = await registerUser(email, password, name);
    res.status(201).json({ message: "OTP telah dikirim ke email" });
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
      message: "Verifikasi berhasil",
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
    const { email, password } = matchedData(req);
    const { accessToken, refreshToken } = await loginUser(email, password);
    res.status(200).json({
      message: "Berhasil login",
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
      res.status(401).json({ message: "Google login gagal" });
      return;
    }

    const { user, accessToken, refreshToken } = req.user as any;

    res.status(200).json({
      message: "Login dengan Google berhasil",
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
