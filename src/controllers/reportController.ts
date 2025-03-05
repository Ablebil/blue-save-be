import { Request, Response, NextFunction } from "express";
import { matchedData } from "express-validator";
import {
  createNewReport,
  updateExistingReportStatus,
} from "../services/reportService";

export const createReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, location, description } = matchedData(req);
    const file = req.file;
    const userId = (req as any).user.id;

    const report = await createNewReport(
      title,
      location,
      description,
      file,
      userId
    );

    res.status(201).json({ message: "Report created successfully", report });
  } catch (err) {
    next(err);
  }
};

export const updateReportStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reportId, status } = matchedData(req);

    const report = await updateExistingReportStatus(reportId, status);

    res.status(200).json({ message: `Report status updated to ${status}` });
  } catch (err) {
    next(err);
  }
};
