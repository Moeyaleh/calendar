import express from "express";
import {
  getTasks,
  deleteTasks,
  addTasks,
} from "../controllers/taskControllers.mjs";
import { authMiddleware } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

router.get("/", authMiddleware, getTasks);
router.post("/", authMiddleware, addTasks);
router.delete("/:id", authMiddleware, deleteTasks);

export default router;
