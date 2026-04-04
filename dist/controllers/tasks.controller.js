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
exports.createTaskController = createTaskController;
exports.getAllTasksController = getAllTasksController;
exports.getTaskByIdController = getTaskByIdController;
exports.updateTaskController = updateTaskController;
exports.deleteTaskController = deleteTaskController;
const tasks_service_1 = require("../services/tasks.service");
function createTaskController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = req.body;
        data = Object.assign(Object.assign({}, data), { assignedTo: req._id });
        try {
            const task = yield (0, tasks_service_1.createTaskService)(data);
            res.status(201).json({
                success: true,
                message: "Task created successfully",
                data: task,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function getAllTasksController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const { count, rows } = yield (0, tasks_service_1.getAllTasksService)(page, limit);
            res.status(200).json({
                success: true,
                message: "Tasks retrieved successfully",
                total: count,
                page,
                limit,
                totalPages: Math.ceil(count / limit),
                data: rows,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function getTaskByIdController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const task = yield (0, tasks_service_1.getTaskByIdService)(req.params.id);
            res.status(200).json({
                success: true,
                message: "Task retrieved successfully",
                data: task,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function updateTaskController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const task = yield (0, tasks_service_1.updateTaskService)(id, req.body);
            res.status(200).json({
                success: true,
                message: "Task updated successfully",
                data: task,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function deleteTaskController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const result = yield (0, tasks_service_1.deleteTaskService)(id);
            res.status(200).json({
                success: true,
                message: result.message,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
