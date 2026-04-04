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
exports.emailQueue = void 0;
exports.addEmailToQueue = addEmailToQueue;
const bullmq_1 = require("bullmq");
const connectRedis_1 = require("../config/db/connectRedis");
const connection = (0, connectRedis_1.connectRedis)();
exports.emailQueue = new bullmq_1.Queue("email", { connection });
function addEmailToQueue(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield exports.emailQueue.add("sendEmail", data, {
            attempts: 3,
            backoff: {
                type: "exponential",
                delay: 5000,
            },
            removeOnComplete: true,
            removeOnFail: false,
        });
        console.log("📩 Email job added to queue with ID:", result.id);
        return result;
    });
}
