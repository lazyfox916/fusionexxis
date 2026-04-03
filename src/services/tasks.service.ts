import Tasks from "../models/tasks.model";
import { AppError } from "../utils/AppError";
import { sanitizeTaskResponse } from "../utils/sanitizer";

type TaskData = {
  title?: string;
  description?: string;
  status?: "pending" | "in_progress" | "completed";
  assignedTo?: string;
};

export async function createTaskService(taskData: TaskData) {
  const task = await Tasks.create(taskData);

  if (!task) {
    throw new AppError("Failed to create task", 500);
  }

  return sanitizeTaskResponse(task);
}

export async function getAllTasksService() {
  const tasks = await Tasks.findAll();

  return tasks.map((task) => sanitizeTaskResponse(task));
}

export async function getTaskByIdService(taskId: string) {
  const task = await Tasks.findByPk(taskId);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  return sanitizeTaskResponse(task);
}

export async function updateTaskService(taskId: string, taskData: TaskData) {
  const task = await Tasks.findByPk(taskId);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  await task.update(taskData);

  return sanitizeTaskResponse(task);
}

export async function deleteTaskService(taskId: string) {
  const task = await Tasks.findByPk(taskId);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  await task.destroy();

  return { message: "Task deleted successfully" };
}
