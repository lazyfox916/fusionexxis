import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

type AnyError = Error & {
  statusCode?: number;
  status?: string | number;
  isOperational?: boolean;
  code?: string | number;
  name?: string;
  errors?: Array<{ message: string }>;
  type?: string;
  stack?: string;
};

function toAppError(error: AnyError): AppError {
  if (error instanceof AppError) return error;

  const statusCode =
    typeof error.statusCode === "number"
      ? error.statusCode
      : typeof error.status === "number"
        ? error.status
        : 500;
  const message = error.message || "Something went wrong";

  const appError = new AppError(message, statusCode);
  (appError as unknown as AnyError).isOperational = false;
  return appError;
}

function handleSequelizeError(error: AnyError): AnyError {
  if (
    error.name === "SequelizeValidationError" ||
    error.name === "SequelizeUniqueConstraintError"
  ) {
    const details = error.errors
      ?.map((e) => e.message)
      .filter(Boolean)
      .join(", ");
    return new AppError(
      details || error.message || "Invalid request data",
      400,
    );
  }

  return error;
}

function handleJsonParseError(error: AnyError): AnyError {
  const isInvalidJson =
    error instanceof SyntaxError &&
    ((typeof error.statusCode === "number" && error.statusCode === 400) ||
      (typeof error.status === "number" && error.status === 400) ||
      error.type === "entity.parse.failed");

  if (isInvalidJson) {
    return new AppError("Invalid JSON payload", 400);
  }

  return error;
}

export function notFound(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
}

export function globalErrorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const env = process.env.NODE_ENV ?? "development";

  let error = err as AnyError;
  error = handleJsonParseError(error);
  error = handleSequelizeError(error);

  const appError = toAppError(error);

  if (env === "development") {
    res.status(appError.statusCode).json({
      status: appError.status,
      message: appError.message,
      stack: (error as AnyError).stack,
    });
    return;
  }

  if ((appError as unknown as AnyError).isOperational) {
    res.status(appError.statusCode).json({
      status: appError.status,
      message: appError.message,
    });
    return;
  }

  res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
}
