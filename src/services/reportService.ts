import { supabase } from "../config/supabase";
import { Readable } from "stream";
import {
  createReport,
  findReportById,
  updateReportStatus,
} from "../repositories/reportRepository";
import HttpError from "../utils/HttpError";
import { ReportStatus } from "../types";

export const createNewReport = async (
  title: string,
  location: string,
  description: string,
  file: any,
  userId: string
) => {
  if (!file) {
    throw new HttpError("File is required", 400);
  }

  const fileStream = Readable.from(file.buffer);

  const { data, error } = await supabase.storage
    .from("reports")
    .upload(
      `${userId}/${Date.now()}_${Math.random().toString(36).substring(2)}_${
        file.originalname
      }`,
      fileStream,
      {
        cacheControl: "3600",
        contentType: file.mimetype,
        upsert: false,
        duplex: "half",
      }
    );

  if (error) {
    throw new HttpError(error.message, 500);
  }

  const mediaUrl = `${
    supabase.storage.from("reports").getPublicUrl(data.path).data.publicUrl
  }`;

  return await createReport({
    title,
    location,
    description,
    media: mediaUrl,
    userId,
  });
};

export const verifyExistingReport = async (reportId: string) => {
  const report = await findReportById(reportId);
  if (!report) {
    throw new HttpError("Report not found", 404);
  }

  return await updateReportStatus(reportId, ReportStatus.VERIFIED);
};
