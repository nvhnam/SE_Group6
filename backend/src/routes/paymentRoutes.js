import { Router } from "express";
import {
  createPayment,
  getPaymentByOrderID,
} from "../controllers/paymentController.js";

const router = Router();

router.post("/", createPayment);
router.get("/:orderID", getPaymentByOrderID);

export default router;
