import express from "express";
import {
  getTasks,
  deleteTasks,
  addTasks,
} from "../controllers/taskControllers.mjs";

const router = express.Router();

router.get("/", getTasks);
router.post("/", addTasks);
router.delete("/:id", deleteTasks);

export default router;
