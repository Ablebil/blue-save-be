import prisma from "../config/database";
import { ReportStatus } from "../types";

export const createReport = async (data: any) => {
  return await prisma.report.create({ data });
};

export const findReportById = async (id: string) => {
  return await prisma.report.findUnique({ where: { id } });
};

export const updateStatus = async (id: string, status: ReportStatus) => {
  return await prisma.report.update({
    where: { id },
    data: { status },
  });
};
