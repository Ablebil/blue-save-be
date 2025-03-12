import { Router } from "express";
import { createPayment } from "../controllers/donationController";
import { handleWebhook } from "../controllers/webhookController";
import passport from "passport";
import { createPaymentValidation } from "../validators/donationValidator";

const router = Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createPaymentValidation,
  createPayment
);

router.post("/webhook", handleWebhook);

export default router;
