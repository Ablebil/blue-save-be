import { Router } from "express";
import { viewProfile, updateProfile } from "../controllers/profileController";
import { updateProfileValidation } from "../validators/profileValidator";
import passport from "passport";

const router = Router();

router.get("/", passport.authenticate("jwt", { session: false }), viewProfile);

router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  updateProfileValidation,
  updateProfile
);

export default router;
