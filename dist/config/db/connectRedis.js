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
    const redisUrl = REDIS_URI !== null && REDIS_URI !== void 0 ? REDIS_URI : "redis://127.0.0.1:6380";
    if (!REDIS_URI) {
        console.warn("REDIS_URL not set; defaulting to redis://127.0.0.1:6380");
    }
    const redis = new Redis(redisUrl, {
        maxRetriesPerRequest: null,
    });
    redis.on("error", (err) => {
        console.error("\x1b[31m Redis Connection Error:", err, "\x1b[0m");
    });
    (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield redis.set("test_key", "Hello Redis!");
        }
        catch (err) {
            console.error("Redis test failed:", err);
        }
    }))();
    return redis;
};
exports.connectRedis = connectRedis;
