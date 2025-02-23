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
  rememberMe: {
    in: ["body"],
    optional: true,
    isBoolean: {
      errorMessage: "Remember me harus berupa boolean",
    },
  },
});

export const refreshTokenValidation = checkSchema({
  refreshToken: {
    in: ["body"],
    isString: {
      errorMessage: "Refresh token harus berupa string",
    },
    notEmpty: {
      errorMessage: "Refresh token tidak boleh kosong",
    },
  },
});

export const logoutValidation = checkSchema({
  refreshToken: {
    in: ["body"],
    isString: {
      errorMessage: "Refresh token harus berupa string",
    },
    notEmpty: {
      errorMessage: "Refresh token tidak boleh kosong",
    },
  },
});

export const forgotPasswordValidation = checkSchema({
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Format email tidak valid",
    },
    notEmpty: {
      errorMessage: "Email tidak  boleh kosong",
    },
  },
});

export const resetPasswordValidation = checkSchema({
  resetToken: {
    in: ["query"],
    isString: {
      errorMessage: "Reset token harus berupa string",
    },
    notEmpty: {
      errorMessage: "Reset token tidak boleh kosong",
    },
  },
  newPassword: {
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
