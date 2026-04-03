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
exports.connectRedis = void 0;
const Redis = require("ioredis");
const { REDIS_URI } = require("../env");
const connectRedis = () => {
    const redis = new Redis(REDIS_URI);
    redis.on("connect", () => {
        console.info("\x1b[38;5;34m ✅ Redis Connected Successfully \x1b[0m");
    });
    redis.on("error", (err) => {
        console.error("\x1b[31m ❌ Redis Connection Error:", err, "\x1b[0m");
    });
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield redis.set("test_key", "Hello Redis!");
        const value = yield redis.get("test_key");
        console.info("\x1b[38;5;34, 🔑 Test_KEY:", value, "\x1b[0m");
    }))();
    return redis;
};
exports.connectRedis = connectRedis;
