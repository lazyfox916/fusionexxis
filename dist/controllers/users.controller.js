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
exports.createUsersController = createUsersController;
exports.loginUsersController = loginUsersController;
exports.getAllUsersController = getAllUsersController;
exports.getUserByIdController = getUserByIdController;
const users_service_1 = require("../services/users.service");
function createUsersController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, users_service_1.signUpUserService)(req.body);
            res.status(201).json({
                success: true,
                message: "User created successfully",
                data: user,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function loginUsersController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, users_service_1.loginUserService)(req.body);
            res.status(200).json({
                success: true,
                message: "User logged in successfully",
                data: user,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function getAllUsersController(_req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, users_service_1.getAllUsersService)();
            res.status(200).json({
                success: true,
                message: "Users retrieved successfully",
                data: users,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function getUserByIdController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, users_service_1.getUserByIdService)(req.params.id);
            res.status(200).json({
                success: true,
                message: "User retrieved successfully",
                data: user,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
