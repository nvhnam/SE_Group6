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

router.get("/customers/:customerID", getCustomerById);
router.get("/customers", getAllCustomers);
router.get("/services/:customerID", getServiceById);
router.put("/services/:customerID", updateService);

router.get("/", getAllAdmins);
router.get("/:adminID", getAdminById);
router.post("/", createAdmin);
router.put("/:adminID", updateAdmin);
router.delete("/:adminID", deleteAdmin);

export default router;
