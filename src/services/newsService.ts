import HttpError from "../utils/HttpError";
import { findAllNews, findNewsById } from "../repositories/newsRepository";

export const fetchAllNews = async (page: number, limit: number) => {
  return await findAllNews(page, limit);
};

export const fetchNewsById = async (id: string) => {
  const newsItem = await findNewsById(id);
  if (!newsItem) {
    throw new HttpError("News not found", 404);
  }

  return newsItem;
};
