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
exports.isAuthenticated = isAuthenticated;
const jwt_1 = require("../utils/jwt");
function isAuthenticated(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let tokenString = req.headers.authorization;
            if (!tokenString) {
                return res.status(401).json({
                    success: false,
                    message: "Authorization token missing",
                });
            }
            if (typeof tokenString === "string" && tokenString.startsWith("Bearer ")) {
                tokenString = tokenString.split(" ")[1];
            }
            const decoded = yield (0, jwt_1.verifyToken)(tokenString);
            const payload = typeof decoded === "string" ? undefined : decoded;
            req._id = payload === null || payload === void 0 ? void 0 : payload.id;
            next();
        }
        catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token",
            });
        }
    });
}
