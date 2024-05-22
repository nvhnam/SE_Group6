import { Router } from "express";
import {
  createCart,
  getAllCarts,
  getCartById,
  updateCart,
  deleteCart,
} from "../controllers/cartController.js";

const router = Router();

router.post("/", createCart);
router.get("/", getAllCarts);
router.get("/:cartID", getCartById);
router.put("/:cartID", updateCart);
router.delete("/:cartID", deleteCart);

export default router;
