import { Router } from "express";
import authRoutes from "./authRoutes";
import reportRoutes from "./reportRoutes";
import donationRoutes from "./donationRoutes";
import newsRoutes from "./newsRoutes";
import eventRoutes from "./eventRoutes";

const router = Router();
router.use("/auth", authRoutes);
router.use("/reports", reportRoutes);
router.use("/donation", donationRoutes);
router.use("/news", newsRoutes);
router.use("/events", eventRoutes);

export default router;
