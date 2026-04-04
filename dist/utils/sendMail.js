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
exports.sendMail = sendMail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("../config/env");
const AppError_1 = require("./AppError");
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: env_1.SMTP_EMAIL,
        pass: env_1.SMTP_PASS,
    },
});
transporter.verify((error, success) => {
    if (error) {
        console.error("SMTP Error:", error);
    }
    else {
        console.log("SMTP Server is ready");
    }
});
function sendMail(mailInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const info = yield transporter.sendMail(mailInfo);
            console.log("Email sent:", info.messageId);
            return info;
        }
        catch (error) {
            console.error("Email send failed:", error);
            throw new AppError_1.AppError(error.message || "Email sending failed", 500);
        }
    });
}
