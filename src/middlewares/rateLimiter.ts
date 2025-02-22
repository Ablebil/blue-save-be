import rateLimit from "express-rate-limit";

export const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  message: { message: "Terlalu banyak permintaan OTP. Coba lagi nanti" },
  standardHeaders: true,
  legacyHeaders: false,
});
