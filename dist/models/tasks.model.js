"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connectPostgres_1 = require("../config/db/connectPostgres");
class Tasks extends sequelize_1.Model {
}
Tasks.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("pending", "in_progress", "completed"),
        defaultValue: "pending",
    },
    assignedTo: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: "Users",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
}, {
    sequelize: connectPostgres_1.postgres,
    timestamps: true,
    modelName: "Tasks",
    tableName: "tasks",
});
exports.default = Tasks;
