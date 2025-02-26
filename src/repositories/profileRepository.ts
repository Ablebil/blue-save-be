import prisma from "../config/database";

export const findUserById = async (id: string) => {
  return await prisma.user.findUnique({ where: { id } });
};

export const updateUser = async (
  userId: string,
  name?: string,
  password?: string
) => {
  const data: any = {};
  if (name) data.name = name;
  if (password) data.password = password;

  return await prisma.user.update({
    where: { id: userId },
    data,
  });
};
