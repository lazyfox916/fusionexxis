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
const users_model_1 = __importDefault(require("../models/users.model"));
const AppError_1 = require("../utils/AppError");
const bcrypt_1 = require("../utils/bcrypt");
function signUpUserService(data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const name = (_a = data.name) === null || _a === void 0 ? void 0 : _a.trim();
        const email = (_b = data.email) === null || _b === void 0 ? void 0 : _b.trim().toLowerCase();
        const password = data.password;
        const hashedPassword = (0, bcrypt_1.hashPassword)(password || "");
        if (!name)
            throw new AppError_1.AppError("Name is required", 400);
        if (!email)
            throw new AppError_1.AppError("Email is required", 400);
        if (!password)
            throw new AppError_1.AppError("Password is required", 400);
        const user = yield users_model_1.default.create({ name, email, password: hashedPassword });
        return user;
    });
}
