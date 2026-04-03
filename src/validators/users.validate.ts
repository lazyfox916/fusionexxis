import { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { AppError } from "../utils/AppError";

const userSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 3 characters long")
    .nonempty("Name is required"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .nonempty("Password is required"),
});

export function validateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const result = userSchema.safeParse(req.body);
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
