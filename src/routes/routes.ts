import { Router } from "express";
import authRoutes from "./authRoutes";
import reportRoutes from "./reportRoutes";

const router = Router();
router.use("/auth", authRoutes);
router.use("/reports", reportRoutes);

export default router;
