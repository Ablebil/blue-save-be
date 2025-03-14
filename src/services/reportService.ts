import { supabase } from "../config/supabase";
import { Readable } from "stream";
import {
  createReport,
  findReportsByUserId,
} from "../repositories/reportRepository";
import HttpError from "../utils/HttpError";
import { formatDateWithoutYear } from "../utils/date";

export const createNewReport = async (
  title: string,
  street: string,
  province: string,
  country: string,
  description: string,
  file: Express.Multer.File,
  userId: string
) => {
  if (!file) {
    throw new HttpError("File is required", 400);
  }

  const fileStream = Readable.from(file.buffer);

  const { data, error } = await supabase.storage
    .from("media")
    .upload(
      `reports/${userId}/${Date.now()}_${Math.random()
        .toString(36)
        .substring(2)}_${file.originalname}`,
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
    supabase.storage.from("media").getPublicUrl(data.path).data.publicUrl
  }`;

  const report = await createReport({
    title,
    street,
    province,
    country,
    description,
    media: mediaUrl,
    userId,
  });

  return {
    ...report,
    createdAt: formatDateWithoutYear(new Date(report.createdAt)),
  };
};

export const fetchReportsByUserId = async (userId: string) => {
  const reports = await findReportsByUserId(userId);
  return reports.map((report: any) => ({
    ...report,
    createdAt: formatDateWithoutYear(new Date(report.createdAt)),
  }));
};
