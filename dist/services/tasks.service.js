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
exports.createTaskService = createTaskService;
exports.getAllTasksService = getAllTasksService;
exports.getTaskByIdService = getTaskByIdService;
exports.updateTaskService = updateTaskService;
exports.deleteTaskService = deleteTaskService;
const tasks_model_1 = __importDefault(require("../models/tasks.model"));
const AppError_1 = require("../utils/AppError");
const sanitizer_1 = require("../utils/sanitizer");
function createTaskService(taskData) {
    return __awaiter(this, void 0, void 0, function* () {
        const task = yield tasks_model_1.default.create(taskData);
        if (!task) {
            throw new AppError_1.AppError("Failed to create task", 500);
        }
        return (0, sanitizer_1.sanitizeTaskResponse)(task);
    });
}
function getAllTasksService() {
    return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const { rows, count } = yield tasks_model_1.default.findAndCountAll({
            limit,
            offset,
            order: [["createdAt", "DESC"]],
        });
        return {
            count,
            rows: rows.map((task) => (0, sanitizer_1.sanitizeTaskResponse)(task)),
        };
    });
}
function getTaskByIdService(taskId) {
    return __awaiter(this, void 0, void 0, function* () {
        const task = yield tasks_model_1.default.findByPk(taskId);
        if (!task) {
            throw new AppError_1.AppError("Task not found", 404);
        }
        return (0, sanitizer_1.sanitizeTaskResponse)(task);
    });
}
function updateTaskService(taskId, taskData) {
    return __awaiter(this, void 0, void 0, function* () {
        const task = yield tasks_model_1.default.findByPk(taskId);
        if (!task) {
            throw new AppError_1.AppError("Task not found", 404);
        }
        yield task.update(taskData);
        return (0, sanitizer_1.sanitizeTaskResponse)(task);
    });
}
function deleteTaskService(taskId) {
    return __awaiter(this, void 0, void 0, function* () {
        const task = yield tasks_model_1.default.findByPk(taskId);
        if (!task) {
            throw new AppError_1.AppError("Task not found", 404);
        }
        yield task.destroy();
        return { message: "Task deleted successfully" };
    });
}
