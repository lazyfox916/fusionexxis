"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const connectPostgres_1 = require("./config/db/connectPostgres");
const connectRedis_1 = require("./config/db/connectRedis");
const PORT = 5000;
const userRoutes = require("./routes/users.route");
(0, connectRedis_1.connectRedis)();
(0, connectPostgres_1.testPostgresConnection)();
app_1.default.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
app_1.default.use("/api/users", userRoutes);
