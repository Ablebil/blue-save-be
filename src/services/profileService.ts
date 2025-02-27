import { findUserById, updateUser } from "../repositories/profileRepository";
import bcrypt from "bcrypt";
import HttpError from "../utils/HttpError";

export const getUserProfile = async (userId: string) => {
  const user = await findUserById(userId);
  if (!user) throw new HttpError("User not found", 404);
  return user;
};

export const updateUserProfile = async (
  userId: string,
  name?: string,
  password?: string
) => {
  const user = await findUserById(userId);
  if (!user) throw new HttpError("User not found", 404);

  if (password) {
    password = await bcrypt.hash(password, 10);
  }
  return await updateUser(userId, name, password);
};
