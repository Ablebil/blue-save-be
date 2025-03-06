import prisma from "../config/database";
import bcrypt from "bcrypt";

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const createUser = async (data: any) => {
  return await prisma.user.create({ data });
};

export const updateUser = async (
  identifier: { id?: string; email?: string },
  data: any
) => {
  return await prisma.user.update({
    where: identifier.id ? { id: identifier.id } : { email: identifier.email },
    data,
  });
};

export const addRefreshToken = async (userId: string, token: string) => {
  return await prisma.refreshToken.create({
    data: {
      token,
      userId,
    },
  });
};

export const removeRefreshToken = async (token: string) => {
  return await prisma.refreshToken.deleteMany({
    where: { token },
  });
};

export const findUserByRefreshToken = async (refreshToken: string) => {
  const refreshTokenRecord = await prisma.refreshToken.findFirst({
    where: { token: refreshToken },
    include: { user: true },
  });
  return refreshTokenRecord?.user || null;
};

export const getUserRefreshTokens = async (userId: string) => {
  return await prisma.refreshToken.findMany({
    where: { userId },
  });
};

export const findUserByGoogleId = async (googleId: string) => {
  return await prisma.user.findUnique({ where: { googleId } });
};

export const findUserByResetToken = async (resetToken: string) => {
  const users = await prisma.user.findMany({
    where: { resetTokenExpiresAt: { gt: new Date() } },
  });

  for (const user of users) {
    if (user.resetToken && (await bcrypt.compare(resetToken, user.resetToken)))
      return user;
  }

  return null;
};

export const deleteUser = async (userId: string) => {
  return await prisma.user.delete({
    where: { id: userId },
  });
};
