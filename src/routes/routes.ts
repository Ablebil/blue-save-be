import { Router } from "express";
import authRoutes from "./authRoutes";
import profileRoutes from "./profileRoutes";
import reportRoutes from "./reportRoutes";

const router = Router();
router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/reports", reportRoutes);

export default router;
