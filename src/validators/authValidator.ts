import { checkSchema } from "express-validator";

export const registerValidation = checkSchema({
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Format email tidak valid",
    },
    notEmpty: {
      errorMessage: "Email tidak  boleh kosong",
    },
  },
  password: {
    in: ["body"],
    isLength: {
      options: { min: 8 },
      errorMessage: "Password harus 8 karakter atau lebih",
    },
    notEmpty: {
      errorMessage: "Password tidak boleh kosong",
    },
    matches: {
      options:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      errorMessage:
        "Password harus berisi minimal satu huruf kecil, satu huruf kapital, satu angka, dan satu karakter spesial",
    },
  },
  name: {
    in: ["body"],
    isString: {
      errorMessage: "Nama harus berupa string",
    },
    notEmpty: {
      errorMessage: "Nama tidak boleh kosong",
    },
    trim: true,
    isLength: {
      options: { min: 4, max: 50 },
      errorMessage: "Nama harus antara 4-50 karakter",
    },
  },
});

export const verifyOTPValidation = checkSchema({
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Format email tidak valid",
    },
    notEmpty: {
      errorMessage: "Email tidak boleh kosong",
    },
  },
  otp: {
    in: ["body"],
    isLength: {
      options: { min: 6, max: 6 },
      errorMessage: "OTP harus 6 digit",
    },
    notEmpty: {
      errorMessage: "OTP tidak boleh kosong",
    },
  },
});

export const loginValidation = checkSchema({
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Format email tidak valid",
    },
    notEmpty: {
      errorMessage: "Email tidak  boleh kosong",
    },
  },
  password: {
    in: ["body"],
    isLength: {
      options: { min: 8 },
      errorMessage: "Password harus 8 karakter atau lebih",
    },
    notEmpty: {
      errorMessage: "Password tidak boleh kosong",
    },
    matches: {
      options:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      errorMessage:
        "Password harus berisi minimal satu huruf kecil, satu huruf kapital, satu angka, dan satu karakter spesial",
    },
  },
});
