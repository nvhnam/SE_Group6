import express from "express";
import {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../controllers/scheduleController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getAllSchedules);
router.get("/:scheduleID", getScheduleById);
router.post("/", createSchedule);
router.put("/:scheduleID", updateSchedule);
router.delete("/:scheduleID", deleteSchedule);

export default router;
