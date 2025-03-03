import { checkSchema } from "express-validator";

export const createReportValidation = checkSchema({
  title: {
    in: ["body"],
    isString: {
      errorMessage: "Title must be a string",
    },
    notEmpty: {
      errorMessage: "Title is required",
    },
    isLength: {
      options: { min: 5 },
      errorMessage: "Title must be at least 5 characters long",
    },
  },
  location: {
    in: ["body"],
    isString: {
      errorMessage: "Location must be a string",
    },
    notEmpty: {
      errorMessage: "Location is required",
    },
    isLength: {
      options: { min: 5 },
      errorMessage: "Location must be at least 5 characters long",
    },
  },
  description: {
    in: ["body"],
    isString: {
      errorMessage: "Description must be a string",
    },
    notEmpty: {
      errorMessage: "Description is required",
    },
    isLength: {
      options: { min: 10 },
      errorMessage: "Description must be at least 10 characters long",
    },
  },
});

export const verifyReportValidation = checkSchema({
  reportId: {
    in: ["params"],
    isUUID: {
      errorMessage: "Invalid report ID format",
    },
    notEmpty: {
      errorMessage: "Report ID is required",
    },
  },
});
