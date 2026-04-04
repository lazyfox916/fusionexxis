"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasks_controller_1 = require("../controllers/tasks.controller");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post("/", auth_1.isAuthenticated, tasks_controller_1.createTaskController);
router.get("/", tasks_controller_1.getAllTasksController);
router.get("/:id", tasks_controller_1.getTaskByIdController);
router.put("/:id", auth_1.isAuthenticated, tasks_controller_1.updateTaskController);
router.delete("/:id", auth_1.isAuthenticated, tasks_controller_1.deleteTaskController);
exports.default = router;
