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

export async function getAllTasksService(page = 1, limit = 10) {
  const offset = (page - 1) * limit;

  const { rows, count } = await Tasks.findAndCountAll({
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });

  return {
    count,
    rows: rows.map((task) => sanitizeTaskResponse(task)),
  };
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
