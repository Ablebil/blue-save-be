import { Router } from "express";
import { createReport, verifyReport } from "../controllers/reportController";
import upload from "../middlewares/upload";
import passport from "passport";
import { isAdmin } from "../middlewares/authMiddleware";
import {
  createReportValidation,
  verifyReportValidation,
} from "../validators/reportValidator";
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

router.patch(
  "/:reportId/verify",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  verifyReportValidation,
  validationResultHandler,
  verifyReport
);

export default router;
