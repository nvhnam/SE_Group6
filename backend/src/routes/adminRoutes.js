import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  getServiceById,
  updateService,
} from "../controllers/serviceController.js";
import {
  getAllCustomers,
  getCustomerById,
} from "../controllers/CustomerController.js";
import {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/customers/:id", authMiddleware, getCustomerById);
router.get("/customers", authMiddleware, getAllCustomers);
router.get("/services/:id", authMiddleware, getServiceById);
router.put("/services/:id", authMiddleware, updateService);

router.get("/", authMiddleware, getAllAdmins);
router.get("/:adminID", authMiddleware, getAdminById);
router.post("/", authMiddleware, createAdmin);
router.put("/:adminID", authMiddleware, updateAdmin);
router.delete("/:adminID", authMiddleware, deleteAdmin);

export default router;
