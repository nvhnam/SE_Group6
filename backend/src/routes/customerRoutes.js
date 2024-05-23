import { Router } from "express";
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getAllCartsForCustomer,
  getCartForCustomerById,
  createCartForCustomer,
  updateCartForCustomer,
  deleteCartForCustomer,
} from "../controllers/CustomerController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getAllCustomers);
router.get("/:customerID", getCustomerById);
router.post("/", createCustomer);
router.put("/:customerID", updateCustomer);
router.delete("/:customerID", deleteCustomer);

router.get("/:customerID/carts", getAllCartsForCustomer);
router.get("/:customerID/carts/:cartID", getCartForCustomerById);
router.post("/:customerID/carts", createCartForCustomer);
router.put("/:customerID/carts/:cartID", updateCartForCustomer);
router.delete("/:customerID/carts/:cartID", deleteCartForCustomer);

export default router;
