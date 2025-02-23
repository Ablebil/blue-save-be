import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import prisma from "./config/database";
import routes from "./routes/routes";
import { errorHandler } from "./middlewares/errorHandler";
import { globalLimiter } from "./middlewares/rateLimiter";
import passport from "passport";
import "./config/passport";
import "./utils/cronJob";

dotenv.config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(express.json());

app.use("/api/v1", globalLimiter, routes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on("SIGINT", async () => {
  try {
    console.log("Shutting down server...");
    await prisma.$disconnect();
    console.log("Disconnected from database");
    process.exit(0);
  } catch (err) {
    console.log("Error disconnecting from database", err);
    process.exit(1);
  }
});
