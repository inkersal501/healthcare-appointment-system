import { Router } from "express";
import { appointmentController } from "../controllers/index.js";

const router = Router();
const { bookAppointment, getAppointments, getAppointmentById, cancelAppointment } = appointmentController;

router.post("/", bookAppointment);
router.get("/", getAppointments);
router.get("/:id", getAppointmentById);
router.put("/:id/cancel", cancelAppointment);

export default router;