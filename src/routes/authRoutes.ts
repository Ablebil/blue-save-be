import { Router } from "express";
import passport from "passport";
import {
  register,
  verify,
  login,
  googleAuthCallback,
  refreshTokenHandler,
} from "../controllers/authController";

const router = Router();

router.post("/register", register);

router.post("/verify-otp", verify);

router.post("/login", login);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuthCallback
);

router.post("/refresh-token", refreshTokenHandler);

export default router;
