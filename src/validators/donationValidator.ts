import { checkSchema } from "express-validator";

export const createPaymentValidation = checkSchema({
  amount: {
    in: ["body"],
    isNumeric: {
      errorMessage: "Amount must be a number",
    },
    notEmpty: {
      errorMessage: "Amount is required",
    },
  },
  phone: {
    in: ["body"],
    isString: {
      errorMessage: "Phone number must be a string",
    },
    notEmpty: {
      errorMessage: "Phone number is required",
    },
  },
});
