import { Request, Response, NextFunction } from "express";
import { matchedData } from "express-validator";
import {
  createNewReport,
  updateExistingReportStatus,
  fetchAllReports,
  fetchReportsByUserId,
} from "../services/reportService";

export const createReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, street, province, country, description } = matchedData(req);
    const file = req.file;
    const userId = (req as any).user.id;

    const report = await createNewReport(
      title,
      street,
      province,
      country,
      description,
      file!,
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

export const getAllReports = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reports = await fetchAllReports();
    res.status(200).json(reports);
  } catch (err) {
    next(err);
  }
};

export const getReportsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const reports = await fetchReportsByUserId(userId);
    res.status(200).json(reports);
  } catch (err) {
    next(err);
  }
};
