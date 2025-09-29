import authRoutes from "./auth.route.js";
import { Router } from "express";

const router = Router();

router.use("/auth", authRoutes);

export default router;