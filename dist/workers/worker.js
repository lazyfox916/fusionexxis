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
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const connectRedis_1 = require("../config/db/connectRedis");
const sendMail_1 = require("../utils/sendMail");
const env_1 = require("../config/env");
const connection = (0, connectRedis_1.connectRedis)();
if (!env_1.SMTP_EMAIL || !env_1.SMTP_PASS) {
    console.error("❌ Missing SMTP creds. Set SMTP_EMAIL and SMTP_PASS in your .env before running the worker.");
    process.exit(1);
}
const worker = new bullmq_1.Worker("email", (job) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Processing email job ${job.id}`);
    const { to, subject, body } = job.data;
    yield (0, sendMail_1.sendMail)({
        from: `"Fusionexis" <${env_1.SMTP_EMAIL}>`,
        to,
        subject,
        text: body,
        html: `<p>${body}</p>`,
    });
    console.log(`📨 Email sent to ${to}`);
}), { connection });
worker.on("ready", () => {
    console.log("Email worker is ready and waiting for jobs");
});
worker.on("completed", (job) => {
    console.log(`Completed email job ${job.id}`);
});
worker.on("failed", (job, err) => {
    console.error(`Failed email job ${job === null || job === void 0 ? void 0 : job.id}:`, err);
});
worker.on("error", (err) => {
    console.error("Worker error:", err);
});
