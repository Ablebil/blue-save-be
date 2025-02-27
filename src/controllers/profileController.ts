import { Request, Response, NextFunction } from "express";
import { matchedData } from "express-validator";
import { getUserProfile, updateUserProfile } from "../services/profileService";

export const viewProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = (req as any).user;
    const user = await getUserProfile(userId);
    const { name, email } = user;
    res.json({ name, email });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = (req as any).user;
    const { name, password } = matchedData(req);
    const user = await updateUserProfile(userId, name, password);
    res.status(200).json({ message: "Profil has been updated successfully" });
  } catch (err) {
    next(err);
  }
};
