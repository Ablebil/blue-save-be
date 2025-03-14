import prisma from "../config/database";

export const findAllNews = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  const news = await prisma.news.findMany({
    skip: offset,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalNews = await prisma.news.count();

  return { news, totalNews };
};

export const findNewsById = async (id: string) => {
  return await prisma.news.findUnique({ where: { id } });
};
