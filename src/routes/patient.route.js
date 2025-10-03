import { Router } from "express";
import { patientController } from "../controllers/index.js";

const router = Router();
const { getPatient } = patientController;
router.get("/:id", getPatient);

export default router;