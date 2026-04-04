"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("../controllers/users.controller");
const users_validate_1 = require("../validators/users.validate");
const router = express_1.default.Router();
router.post("/register", users_validate_1.validateUser, users_controller_1.createUsersController);
router.post("/login", users_controller_1.loginUsersController);
router.get("/", users_controller_1.getAllUsersController);
router.get("/:id", users_controller_1.getUserByIdController);
exports.default = router;
