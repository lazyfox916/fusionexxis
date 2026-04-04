import express from "express";
import {
  createTaskController,
  deleteTaskController,
  getAllTasksController,
  getTaskByIdController,
  updateTaskController,
} from "../controllers/tasks.controller";
import { isAuthenticated } from "../middlewares/auth";

const router = express.Router();

router.post("/", isAuthenticated, createTaskController);

router.get("/", getAllTasksController);

router.get("/:id", getTaskByIdController);

router.put("/:id", isAuthenticated, updateTaskController);

router.delete("/:id", isAuthenticated, deleteTaskController);

export default router;
