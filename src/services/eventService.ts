import {
  findAllEvents,
  findEventById,
  createEventRegistration,
} from "../repositories/eventRepository";
import HttpError from "../utils/HttpError";

export const fetchAllEvents = async (page: number, limit: number) => {
  return await findAllEvents(page, limit);
};

export const fetchEventById = async (eventId: string) => {
  const event = await findEventById(eventId);
  if (!event) {
    throw new HttpError("Event not found", 404);
  }

  return event;
};

export const registerUserToEvent = async (userId: string, eventId: string) => {
  const registration = await createEventRegistration(userId, eventId);
  if (!registration) {
    throw new HttpError("Event registration failed", 400);
  }

  return registration;
};
