import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
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

router.use(authenticate);

router.get("/customers/:id", authorizeAdmin, getCustomerById);
router.get("/customers", authorizeAdmin, getAllCustomers);
router.get("/services/:id", authorizeAdmin, getServiceById);
router.put("/services/:id", authorizeAdmin, updateService);

router.get("/", authorizeAdmin, getAllAdmins);
router.get("/:adminID", authorizeAdmin, getAdminById);
router.post("/", authorizeAdmin, createAdmin);
router.put("/:adminID", authorizeAdmin, updateAdmin);
router.delete("/:adminID", authorizeAdmin, deleteAdmin);

export default router;
