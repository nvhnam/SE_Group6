import { Router } from "express";
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  createServices,
} from "../controllers/serviceController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", getAllServices);
router.get("/:serviceID", getServiceById);
router.post("/", authMiddleware, createService);
router.put("/:serviceID", authMiddleware, updateService);
router.delete("/:serviceID", authMiddleware, deleteService);
router.post("/bulk", authMiddleware, createServices);

export default router;
