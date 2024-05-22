import { Router } from "express";
import {
  getMechanicByEmail,
  getMechanicByName,
  createMechanic,
  getAllMechanics,
  updateMechanic,
  deleteMechanic,
} from "../controllers/mechanicController.js";

const router = Router();

router.get("/email/:email", getMechanicByEmail);

router.get("/name/:name", getMechanicByName);

router.post("/", createMechanic);

router.get("/", getAllMechanics);

router.put("/:mechanicID", updateMechanic);

router.delete("/:mechanicID", deleteMechanic);

export default router;
