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
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const users_model_1 = __importDefault(require("../models/users.model"));
const tasks_model_1 = __importDefault(require("../models/tasks.model"));
const connectPostgres_1 = require("../config/db/connectPostgres");
const bcrypt_1 = require("../utils/bcrypt");
function readJsonFile(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield promises_1.default.readFile(filePath, "utf-8");
        return JSON.parse(data);
    });
}
function seedUsers(users) {
    return __awaiter(this, void 0, void 0, function* () {
        const preparedUsers = yield Promise.all(users.map((user) => __awaiter(this, void 0, void 0, function* () {
            return (Object.assign(Object.assign({}, user), { email: user.email.trim().toLowerCase(), password: yield (0, bcrypt_1.hashPassword)(user.password) }));
        })));
        yield users_model_1.default.bulkCreate(preparedUsers, {
            validate: true,
            ignoreDuplicates: true,
        });
        console.log(`✅ Seeded ${preparedUsers.length} users`);
    });
}
function seedTasks(tasks) {
    return __awaiter(this, void 0, void 0, function* () {
        yield tasks_model_1.default.bulkCreate(tasks, {
            validate: true,
            ignoreDuplicates: true,
        });
        console.log(`✅ Seeded ${tasks.length} tasks`);
    });
}
function runSeed() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usersPath = path_1.default.join(process.cwd(), "src", "config", "db", "seeds", "users.json");
            const tasksPath = path_1.default.join(process.cwd(), "src", "config", "db", "seeds", "tasks.json");
            const users = yield readJsonFile(usersPath);
            const tasks = yield readJsonFile(tasksPath);
            yield connectPostgres_1.postgres.authenticate();
            console.log("✅ Connected to database");
            yield connectPostgres_1.postgres.sync();
            yield seedUsers(users);
            yield seedTasks(tasks);
            console.log("🎉 Seeding completed successfully");
            process.exit(0);
        }
        catch (error) {
            console.error("❌ Seeding failed:", error);
            process.exit(1);
        }
    });
}
runSeed();
