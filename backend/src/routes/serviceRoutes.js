import { Router } from "express";
const router = Router();
import {
  getAllServices,
  getServiceById,
} from "../controllers/serviceController.js";

router.get("/services", getAllServices);

router.get("/services/:id", getServiceById);

export default router;
