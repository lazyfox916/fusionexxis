"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpUserService = signUpUserService;
exports.loginUserService = loginUserService;
exports.getAllUsersService = getAllUsersService;
exports.getUserByIdService = getUserByIdService;
const users_model_1 = __importDefault(require("../models/users.model"));
const emailQueue_1 = require("../queues/emailQueue");
const AppError_1 = require("../utils/AppError");
const bcrypt_1 = require("../utils/bcrypt");
const jwt_1 = require("../utils/jwt");
const sanitizer_1 = require("../utils/sanitizer");
function signUpUserService(data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const name = (_a = data.name) === null || _a === void 0 ? void 0 : _a.trim();
        const email = (_b = data.email) === null || _b === void 0 ? void 0 : _b.trim().toLowerCase();
        const password = data.password;
        if (!name)
            throw new AppError_1.AppError("Name is required", 400);
        if (!email)
            throw new AppError_1.AppError("Email is required", 400);
        if (!password)
            throw new AppError_1.AppError("Password is required", 400);
        const emailExists = yield users_model_1.default.findOne({ where: { email } });
        if (emailExists) {
            throw new AppError_1.AppError("Email already in use", 409);
        }
        const hashedPassword = yield (0, bcrypt_1.hashPassword)(password);
        const user = yield users_model_1.default.create({ name, email, password: hashedPassword });
        (0, emailQueue_1.addEmailToQueue)({
            to: email,
            subject: "Welcome to Fusionexis",
            body: `Hi ${name}, welcome to Fusionexis. Your account has been created successfully.`,
        }).catch((err) => {
            console.error("Failed to enqueue welcome email:", err);
        });
        return user;
    });
}
function loginUserService(data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const email = (_a = data.email) === null || _a === void 0 ? void 0 : _a.trim().toLowerCase();
        const password = data.password;
        if (!email)
            throw new AppError_1.AppError("Email is required", 400);
        if (!password)
            throw new AppError_1.AppError("Password is required", 400);
        const user = yield users_model_1.default.findOne({ where: { email } });
        const hashedPassword = (user === null || user === void 0 ? void 0 : user.password) || null;
        if (!user || !hashedPassword) {
            throw new AppError_1.AppError("Invalid Credentials", 401);
        }
        const isPasswordValid = yield (0, bcrypt_1.comparePassword)(password, hashedPassword);
        if (!isPasswordValid) {
            throw new AppError_1.AppError("Invalid Credentials", 401);
        }
        const token = (0, jwt_1.generateToken)(user);
        return (0, sanitizer_1.sanitizeUserResponse)(user, token);
    });
}
function getAllUsersService() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield users_model_1.default.findAll();
        return users.map((user) => (0, sanitizer_1.sanitizeUserResponse)(user));
    });
}
function getUserByIdService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield users_model_1.default.findByPk(userId);
        if (!user) {
            throw new AppError_1.AppError("User not found", 404);
        }
        return (0, sanitizer_1.sanitizeUserResponse)(user);
    });
}
