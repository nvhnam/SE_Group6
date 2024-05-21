import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
  getServiceById,
  updateService,
} from "../controllers/serviceController.js";
import { getUserById } from "../controllers/userController.js";

const router = express.Router();

router.use(authenticate);

router.get("/users/:id", authorizeAdmin, getUserById);
router.get("/services/:id", authorizeAdmin, getServiceById);
router.put("/services/:id", authorizeAdmin, updateService);

export default router;
