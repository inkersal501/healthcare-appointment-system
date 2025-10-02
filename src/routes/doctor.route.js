import { Router } from "express";
import { doctorController } from "../controllers/index.js";

const router = Router();
const {getDoctors, updateAvailability} = doctorController;

router.get("/", getDoctors);
router.post("/availability", updateAvailability);