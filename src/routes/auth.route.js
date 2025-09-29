import {Router } from "express";
import { authController } from "../controllers/index.js";

const {registerAdmin, registerDoctor, registerPatient} = authController;
const router = Router(); 

router.post("/register/admin", registerAdmin);
router.post("/register/doctor", registerDoctor);
router.post("/register/patient", registerPatient);
router.post("/login", ()=>{});
router.post("/refresh", ()=>{});

export default router;