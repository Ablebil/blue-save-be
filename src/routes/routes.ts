import { Router } from "express";
import authRoutes from "./authRoutes";
import reportRoutes from "./reportRoutes";
import donationRoutes from "./donationRoutes";
import newsRoutes from "./newsRoutes";

const router = Router();
router.use("/auth", authRoutes);
router.use("/reports", reportRoutes);
router.use("/donation", donationRoutes);
router.use("/news", newsRoutes);

export default router;
