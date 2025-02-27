import { checkSchema } from "express-validator";

export const updateProfileValidation = checkSchema({
  name: {
    in: ["body"],
    isString: {
      errorMessage: "Name must be a string",
    },
    isLength: {
      options: { min: 5, max: 255 },
      errorMessage: "Name must be between 5 and 255 characters long",
    },
    optional: true,
    trim: true,
  },
  password: {
    in: ["body"],
    isLength: {
      options: { min: 8 },
      errorMessage: "Password must be at least 8 characters long",
    },
    optional: true,
    matches: {
      options:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      errorMessage:
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    },
  },
});
