import { Request, Response, NextFunction } from "express";
import { findUserByEmail } from "../repositories/authRepository";
import HttpError from "../utils/HttpError";
import { Role } from "../types";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = (req as any).user.email;
  const user = await findUserByEmail(email);

  if (!user || user.role !== Role.ADMIN) {
    return next(new HttpError("Akses ditolak, hanya untuk ADMIN", 403));
  }

  next();
};
