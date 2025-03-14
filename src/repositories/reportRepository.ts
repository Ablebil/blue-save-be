import prisma from "../config/database";

export const createReport = async (data: any) => {
  return await prisma.report.create({ data });
};

export const findReportsByUserId = async (userId: string) => {
  return await prisma.report.findMany({
    where: { userId },
  });
};
