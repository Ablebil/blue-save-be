import { checkSchema } from "express-validator";

export const getAllNewsValidator = checkSchema({
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

export const getNewsValidator = checkSchema({
  id: {
    in: ["params"],
    isUUID: {
      errorMessage: "Invalid news ID format",
    },
    notEmpty: {
      errorMessage: "News ID is required",
    },
  },
});
