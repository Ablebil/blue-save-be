import { Request, Response, NextFunction } from "express";
import {
  fetchAllEvents,
  fetchEventById,
  registerUserToEvent,
} from "../services/eventService";
import { matchedData } from "express-validator";

export const getAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10 } = matchedData(req);

    const { events, totalEvents } = await fetchAllEvents(page, limit);

    res.status(200).json({
      events,
      totalEvents,
      currentPage: page,
      totalPage: Math.ceil(totalEvents / limit),
    });
  } catch (err) {
    next(err);
  }
};

export const getEventById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { eventId } = matchedData(req);
    const event = await fetchEventById(eventId);

    res.status(200).json(event);
  } catch (err) {
    next(err);
  }
};

export const registerForEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const { eventId } = matchedData(req);

    const registration = await registerUserToEvent(userId, eventId);

    res
      .status(201)
      .json({ message: "Successfully registered for event", registration });
  } catch (err) {
    next(err);
  }
};
