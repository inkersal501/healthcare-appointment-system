import authRoutes from "./auth.route.js";
import doctorRoutes from "./doctor.route.js";
import patientRoutes from ".patient.route.js";
import appointmentRoutes from "./appointments.route.js";
import paymentRoutes from "./payment.route.js";

import { Router } from "express";

const router = Router();

router.use("/auth", authRoutes);
router.use("/doctors", doctorRoutes);
router.use("/patient", patientRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/payment", paymentRoutes);

export default router;