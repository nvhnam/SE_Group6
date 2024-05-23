import { Router } from "express";
import {
  createCart,
  getAllCarts,
  getCartById,
  updateCart,
  deleteCart,
} from "../controllers/cartController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/", createCart);
router.get("/", getAllCarts);
router.get("/:cartID", getCartById);
router.put("/:cartID", updateCart);
router.delete("/:cartID", deleteCart);

export default router;
