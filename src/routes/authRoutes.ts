import { Router } from "express";
import passport from "passport";
import {
  register,
  verify,
  login,
  googleAuthCallback,
  refreshTokenHandler,
  logout,
  forgotPassword,
  resetPasswordHandler,
  deleteUser,
} from "../controllers/authController";
import {
  registerValidation,
  verifyOTPValidation,
  loginValidation,
  refreshTokenValidation,
  logoutValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} from "../validators/authValidator";
import { validationResultHandler } from "../middlewares/validationResultHandler";
import {
  otpLimiter,
  registerLimiter,
  loginLimiter,
  refreshTokenLimiter,
  forgotPasswordLimiter,
  passwordResetLimiter,
} from "../middlewares/rateLimiter";

const router = Router();

router.post(
  "/register",
  registerLimiter,
  registerValidation,
  validationResultHandler,
  register
);

router.post(
  "/verify-otp",
  otpLimiter,
  verifyOTPValidation,
  validationResultHandler,
  verify
);

router.post(
  "/login",
  loginLimiter,
  loginValidation,
  validationResultHandler,
  login
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuthCallback
);

router.post(
  "/refresh-token",
  refreshTokenLimiter,
  refreshTokenValidation,
  validationResultHandler,
  refreshTokenHandler
);

router.post("/logout", logoutValidation, validationResultHandler, logout);

router.post(
  "/forgot-password",
  forgotPasswordLimiter,
  forgotPasswordValidation,
  validationResultHandler,
  forgotPassword
);

router.post(
  "/reset-password/:resetToken",
  passwordResetLimiter,
  resetPasswordValidation,
  validationResultHandler,
  resetPasswordHandler
);

export default router;
