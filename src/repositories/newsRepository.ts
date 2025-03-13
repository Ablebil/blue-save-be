import prisma from "../config/database";

export const findAllNews = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  return await prisma.news.findMany({
    skip: offset,
    take: limit,
  });
};

export const findNewsById = async (id: string) => {
  return await prisma.news.findUnique({ where: { id } });
};
