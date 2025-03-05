import { Router } from "express";
import {
  createReport,
  updateReportStatus,
  getAllReports,
  getReportsByUserId,
} from "../controllers/reportController";
import upload from "../middlewares/upload";
import passport from "passport";
import { isAdmin } from "../middlewares/authMiddleware";
import {
  createReportValidation,
  updateReportStatusValidation,
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
  "/update-status/:reportId",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  updateReportStatusValidation,
  validationResultHandler,
  updateReportStatus
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  getAllReports
);

router.get(
  "/user-reports",
  passport.authenticate("jwt", { session: false }),
  getReportsByUserId
);

export default router;
