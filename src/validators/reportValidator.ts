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
  street: {
    in: ["body"],
    isString: {
      errorMessage: "Street must be a string",
    },
    notEmpty: {
      errorMessage: "Street is required",
    },
    isLength: {
      options: { min: 5 },
      errorMessage: "Street must be at least 5 characters long",
    },
  },
  province: {
    in: ["body"],
    isString: {
      errorMessage: "Province must be a string",
    },
    notEmpty: {
      errorMessage: "Province is required",
    },
    isLength: {
      options: { min: 5 },
      errorMessage: "Province must be at least 5 characters long",
    },
  },
  country: {
    in: ["body"],
    isString: {
      errorMessage: "Country must be a string",
    },
    notEmpty: {
      errorMessage: "Country is required",
    },
    isLength: {
      options: { min: 5 },
      errorMessage: "Country must be at least 5 characters long",
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

export const updateReportStatusValidation = checkSchema({
  reportId: {
    in: ["params"],
    isUUID: {
      errorMessage: "Invalid report ID format",
    },
    notEmpty: {
      errorMessage: "Report ID is required",
    },
  },
  status: {
    in: ["body"],
    isString: {
      errorMessage: "Status must be a string",
    },
    notEmpty: {
      errorMessage: "Status is required",
    },
    isIn: {
      options: [["WAITING", "VERIFIED", "INVALID", "RESOLVED"]],
      errorMessage: "Invalid status value",
    },
  },
});
