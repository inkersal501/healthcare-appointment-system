import { Router } from "express";
import { paymentController } from "../controllers"; 

const router = Router();
const {createPayment, getPayment} = paymentController;

router.post("/", createPayment);
router.get("/:id", getPayment);

export default router;