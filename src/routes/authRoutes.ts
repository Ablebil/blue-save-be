import { Router } from "express";
import passport from "passport";
import {
  register,
  verify,
  login,
  googleAuthCallback,
  refreshTokenHandler,
  logout,
} from "../controllers/authController";
import {
  registerValidation,
  verifyOTPValidation,
  loginValidation,
  refreshTokenValidation,
  logoutValidation,
} from "../validators/authValidator";
import { validationResultHandler } from "../middlewares/validationResultHandler";
import { otpLimiter } from "../middlewares/rateLimiter";

const router = Router();

router.post("/register", registerValidation, validationResultHandler, register);

router.post(
  "/verify-otp",
  otpLimiter,
  verifyOTPValidation,
  validationResultHandler,
  verify
);

router.post("/login", loginValidation, validationResultHandler, login);

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
  refreshTokenValidation,
  validationResultHandler,
  refreshTokenHandler
);

router.post("/logout", logoutValidation, validationResultHandler, logout);

export default router;
