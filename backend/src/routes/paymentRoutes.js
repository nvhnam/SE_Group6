import { Router } from "express";
import {
  createPayment,
  getPaymentByOrderID,
} from "../controllers/paymentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/", createPayment);
router.get("/:orderID", getPaymentByOrderID);

export default router;
