import { checkSchema } from "express-validator";

export const updateProfileValidation = checkSchema({
  name: {
    in: ["body"],
    isString: {
      errorMessage: "Nama harus berupa string",
    },
    isLength: {
      options: { min: 5, max: 255 },
      errorMessage: "Nama harus di antara 5 dan 255 karakter",
    },
    optional: true,
    trim: true,
  },
  password: {
    in: ["body"],
    isLength: {
      options: { min: 8 },
      errorMessage: "Password harus 8 karakter atau lebih",
    },
    optional: true,
    matches: {
      options:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      errorMessage:
        "Password harus berisi minimal satu huruf kecil, satu huruf kapital, satu angka, dan satu karakter spesial",
    },
  },
});
