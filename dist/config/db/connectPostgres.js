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
exports.testPostgresConnection = exports.postgres = void 0;
const sequelize_1 = require("sequelize");
const env_1 = require("../env");
exports.postgres = new sequelize_1.Sequelize(env_1.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
    timezone: "+05:45",
    pool: {
        max: 50,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    dialectOptions: {
        ssl: env_1.SSL === "true" ? { require: true, rejectUnauthorized: false } : false,
    },
});
const testPostgresConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.postgres.authenticate();
        yield exports.postgres.sync({ alter: false });
        console.info("\x1b[38;5;34m 👾 Postgres Database Synced Successfully. \x1b[0m");
        console.info("\x1b[38;5;34m ✅ Connected to Postgres Database... \x1b[0m");
    }
    catch (error) {
        console.error("❌ Unable to connect to Postgres:", error);
    }
});
exports.testPostgresConnection = testPostgresConnection;
