"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = validateUser;
const zod_1 = require("zod");
const AppError_1 = require("../utils/AppError");
const userSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, "Name must be at least 3 characters long")
        .nonempty("Name is required"),
    email: zod_1.z
        .string()
        .email("Invalid email address")
        .nonempty("Email is required"),
    password: zod_1.z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .nonempty("Password is required"),
});
function validateUser(req, res, next) {
    try {
        const result = userSchema.safeParse(req.body);
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
