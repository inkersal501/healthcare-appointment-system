import { Router } from "express";

const router = Router();

router.get("/:id", get);

export default router;