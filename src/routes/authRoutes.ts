import { Router } from "express";
import passport from "passport";
import {
  register,
  verify,
  login,
  googleAuthCallback,
  refreshTokenHandler,
} from "../controllers/authController";
import {
  registerValidation,
  verifyOTPValidation,
  loginValidation,
  refreshTokenValidation,
} from "../validators/authValidator";
import { validationResultHandler } from "../middlewares/validationResultHandler";

const router = Router();

router.post("/register", registerValidation, validationResultHandler, register);

router.post(
  "/verify-otp",
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

router.post("/refresh-token", refreshTokenValidation, refreshTokenHandler);

export default router;
