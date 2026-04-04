"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTask = validateTask;
const zod_1 = require("zod");
const AppError_1 = require("../utils/AppError");
const taskStatusSchema = zod_1.z.enum(["pending", "in_progress", "completed"]);
const taskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    description: zod_1.z.string().optional(),
    status: taskStatusSchema.optional(),
    assignedTo: zod_1.z.string().uuid("assignedTo must be a valid UUID"),
});
function validateTask(req, res, next) {
    try {
        const result = taskSchema.safeParse(req.body);
        if (!result.success) {
            const errorMessage = result.error.issues
                .map((issue) => issue.message)
                .join(", ");
            return next(new AppError_1.AppError(errorMessage, 400));
        }
        next();
    }
    catch (error) {
        next(error);
    }
}
