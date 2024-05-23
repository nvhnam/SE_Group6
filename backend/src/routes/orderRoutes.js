import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:orderID", getOrderById);
router.put("/:orderID", updateOrder);
router.delete("/:orderID", deleteOrder);

export default router;
