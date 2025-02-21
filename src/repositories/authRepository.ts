import prisma from "../config/database";

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

export const findUserByRefreshToken = async (refreshToken: string) => {
  return await prisma.user.findFirst({ where: { refreshToken } });
};

export const findUserByGoogleId = async (googleId: string) => {
  return await prisma.user.findUnique({ where: { googleId } });
};
