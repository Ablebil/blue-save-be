import { fetchAllNews, fetchNewsById } from "../services/newsService";
import { Request, Response, NextFunction } from "express";
import { matchedData } from "express-validator";

export const getAllNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10 } = matchedData(req);

    const { news, totalNews } = await fetchAllNews(page, limit);

    res.status(200).json({
      news,
      totalNews,
      currentPage: page,
      totalPage: Math.ceil(totalNews / limit),
    });
  } catch (err) {
    next(err);
  }
};

export const getNewsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = matchedData(req);
    const newsItem = await fetchNewsById(id);

    res.status(200).json(newsItem);
  } catch (err) {
    next(err);
  }
};
