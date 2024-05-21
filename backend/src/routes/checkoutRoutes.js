import express from "express";
import { checkout } from "../controllers/checkoutController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, checkout);

export default router;
