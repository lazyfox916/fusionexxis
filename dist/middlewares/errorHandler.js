"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = notFound;
exports.globalErrorHandler = globalErrorHandler;
const AppError_1 = require("../utils/AppError");
function toAppError(error) {
    if (error instanceof AppError_1.AppError)
        return error;
    const statusCode = typeof error.statusCode === "number"
        ? error.statusCode
        : typeof error.status === "number"
            ? error.status
            : 500;
    const message = error.message || "Something went wrong";
    const appError = new AppError_1.AppError(message, statusCode);
    appError.isOperational = false;
    return appError;
}
function handleSequelizeError(error) {
    var _a;
    if (error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError") {
        const details = (_a = error.errors) === null || _a === void 0 ? void 0 : _a.map((e) => e.message).filter(Boolean).join(", ");
        return new AppError_1.AppError(details || error.message || "Invalid request data", 400);
    }
    return error;
}
function handleJsonParseError(error) {
    const isInvalidJson = error instanceof SyntaxError &&
        ((typeof error.statusCode === "number" && error.statusCode === 400) ||
            (typeof error.status === "number" && error.status === 400) ||
            error.type === "entity.parse.failed");
    if (isInvalidJson) {
        return new AppError_1.AppError("Invalid JSON payload", 400);
    }
    return error;
}
function notFound(req, _res, next) {
    next(new AppError_1.AppError(`Cannot find ${req.originalUrl} on this server`, 404));
}
function globalErrorHandler(err, _req, res, _next) {
    var _a;
    const env = (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : "development";
    let error = err;
    error = handleJsonParseError(error);
    error = handleSequelizeError(error);
    const appError = toAppError(error);
    if (env === "development") {
        res.status(appError.statusCode).json({
            status: appError.status,
            message: appError.message,
            stack: error.stack,
        });
        return;
    }
    if (appError.isOperational) {
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
