import { Router } from "express";

const router = Router();

router.get("/:id", getPatient);

export default router;