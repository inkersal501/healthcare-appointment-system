import {Router } from "express";
import { authController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/index.js";

const {registerAdmin, registerDoctor, registerPatient, login, refresh} = authController;
const {authenticate} = authMiddleware;
const router = Router(); 

router.post("/register/admin", registerAdmin);
router.post("/register/doctor", registerDoctor);
router.post("/register/patient", registerPatient);
router.post("/login", login);

router.use(authenticate);
router.post("/refresh", refresh);

export default router;