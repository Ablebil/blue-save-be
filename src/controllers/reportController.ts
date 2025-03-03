import { Request, Response, NextFunction } from "express";
import { matchedData } from "express-validator";
import {
  createNewReport,
  verifyExistingReport,
} from "../services/reportService";

export const createReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.user);
    console.log("Uploaded file:", req.file);

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

export const verifyReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reportId } = req.params;

    const report = await verifyExistingReport(reportId);

    res.status(200).json({ message: "Report verified successfully", report });
  } catch (err) {
    next(err);
  }
};
