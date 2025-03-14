import { Router } from "express";
import {
  createReport,
  getReportsByUserId,
} from "../controllers/reportController";
import upload from "../middlewares/upload";
import passport from "passport";
import { createReportValidation } from "../validators/reportValidator";
import { validationResultHandler } from "../middlewares/validationResultHandler";

const router = Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("file"),
  createReportValidation,
  validationResultHandler,
  createReport
);

router.get(
  "/user-reports",
  passport.authenticate("jwt", { session: false }),
  getReportsByUserId
);

export default router;
