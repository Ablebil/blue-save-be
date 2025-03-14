import prisma from "../config/database";

export const findAllEvents = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const events = await prisma.event.findMany({
    skip,
    take: limit,
    orderBy: {
      date: "asc",
    },
  });

  const totalEvents = await prisma.event.count();

  return { events, totalEvents };
};

export const findEventById = async (eventId: string) => {
  return await prisma.event.findUnique({
    where: { id: eventId },
  });
};

export const createEventRegistration = async (
  userId: string,
  eventId: string
) => {
  return await prisma.eventRegistration.create({
    data: { userId, eventId },
  });
};
