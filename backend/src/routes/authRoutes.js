import express from "express";
const router = express.Router();
import { register, login, logout } from "../controllers/authController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

router.post("/register", register);
router.post("/login", authenticate, login);
router.post("/logout", logout);

export default router;
