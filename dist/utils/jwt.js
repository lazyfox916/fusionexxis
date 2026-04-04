"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const AppError_1 = require("./AppError");
function generateToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
    };
    const token = jsonwebtoken_1.default.sign(payload, env_1.JWT_SECRET, {
        expiresIn: "1h",
    });
    return token;
}
function verifyToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.JWT_SECRET);
        return decoded;
    }
    catch (error) {
        throw new AppError_1.AppError("Invalid token", 401);
    }
}
