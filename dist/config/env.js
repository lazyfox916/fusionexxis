"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMTP_PASS = exports.SMTP_EMAIL = exports.JWT_SECRET = exports.REDIS_URI = exports.SSL = exports.DATABASE_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.DATABASE_URL = process.env.DATABASE_URL;
exports.SSL = process.env.SSL;
exports.REDIS_URI = process.env.REDIS_URL;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.SMTP_EMAIL = process.env.SMTP_EMAIL;
exports.SMTP_PASS = process.env.SMTP_PASS;
