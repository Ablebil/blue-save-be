import { checkSchema } from "express-validator";

export const getAllEventsValidator = checkSchema({
  page: {
    in: ["query"],
    optional: true,
    isInt: {
      options: { min: 1 },
      errorMessage: "Page must be a positive integer",
    },
    toInt: true,
  },
  limit: {
    in: ["query"],
    optional: true,
    isInt: {
      options: { min: 1 },
      errorMessage: "Limit must be a positive integer",
    },
    toInt: true,
  },
});

export const getEventAndRegisterEventValidator = checkSchema({
  eventId: {
    in: ["params"],
    isUUID: {
      errorMessage: "Invalid event ID format",
    },
    notEmpty: {
      errorMessage: "Event ID is required",
    },
  },
});
