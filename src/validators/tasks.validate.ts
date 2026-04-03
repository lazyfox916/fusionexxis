import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { AppError } from "../utils/AppError";

const taskStatusSchema = z.enum(["pending", "in_progress", "completed"]);

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: taskStatusSchema.optional(),
  assignedTo: z.string().uuid("assignedTo must be a valid UUID"),
});

export function validateTask(req: Request, res: Response, next: NextFunction) {
  try {
    const result = taskSchema.safeParse(req.body);
    if (!result.success) {
      const errorMessage = result.error.issues
        .map((issue) => issue.message)
        .join(", ");
      return next(new AppError(errorMessage, 400));
    }
    next();
  } catch (error) {
    next(error);
  }
}
