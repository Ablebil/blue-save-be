import rateLimit from "express-rate-limit";

export const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  message: { message: "Terlalu banyak permintaan OTP. Coba lagi nanti" },
  standardHeaders: true,
  legacyHeaders: false,
});

export const registerLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 3,
  message: { error: "Terlalu banyak pendaftaran. Coba lagi nanti." },
  standardHeaders: true,
  legacyHeaders: false,
});

export const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: { message: "Terlalu banyak percobaan login. Coba lagi nanti." },
  standardHeaders: true,
  legacyHeaders: false,
});

export const refreshTokenLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: {
    error: "Terlalu banyak permintaan refresh token. Coba lagi nanti.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: "Too many password reset requests, please try again later.",
});

export const passwordResetLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 3,
  message: {
    error: "Terlalu banyak permintaan reset password. Coba lagi nanti.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const globalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 200,
  message: { error: "Terlalu banyak permintaan. Coba lagi nanti." },
  standardHeaders: true,
  legacyHeaders: false,
});
