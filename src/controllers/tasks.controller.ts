import type { NextFunction, Request, Response } from "express";

import {
  createTaskService,
  deleteTaskService,
  getAllTasksService,
  getTaskByIdService,
  updateTaskService,
} from "../services/tasks.service";

export async function createTaskController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let data = req.body;
  data = {
    ...data,
    assignedTo: req._id,
  };
  try {
    const task = await createTaskService(data);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllTasksController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const { count, rows } = await getAllTasksService(page, limit);

    res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully",
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
      data: rows,
    });
  } catch (error) {
    next(error);
  }
}

export async function getTaskByIdController(
  req: any,
  res: Response,
  next: NextFunction,
) {
  try {
    const task = await getTaskByIdService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Task retrieved successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateTaskController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const task = await updateTaskService(id, req.body);

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteTaskController(
  req: any,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const result = await deleteTaskService(id);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
}
