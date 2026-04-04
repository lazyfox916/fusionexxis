"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAssociations = initAssociations;
const users_model_1 = __importDefault(require("./users.model"));
const tasks_model_1 = __importDefault(require("./tasks.model"));
function initAssociations() {
    users_model_1.default.hasMany(tasks_model_1.default, {
        foreignKey: "assignedTo",
        as: "tasks",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    tasks_model_1.default.belongsTo(users_model_1.default, {
        foreignKey: "assignedTo",
        as: "assignee",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
}
