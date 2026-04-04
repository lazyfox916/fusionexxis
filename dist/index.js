"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const associations_1 = require("./models/associations");
const connectPostgres_1 = require("./config/db/connectPostgres");
const users_route_1 = __importDefault(require("./routes/users.route"));
const tasks_route_1 = __importDefault(require("./routes/tasks.route"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const openapi_1 = require("./docs/openapi");
const errorHandler_1 = require("./middlewares/errorHandler");
require("./workers/worker");
const PORT = Number(process.env.PORT) || 8080;
(0, associations_1.initAssociations)();
(0, connectPostgres_1.testPostgresConnection)();
app_1.default.use("/api/users", users_route_1.default);
app_1.default.use("/api/tasks", tasks_route_1.default);
app_1.default.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openapi_1.openapiSpec));
app_1.default.use(errorHandler_1.notFound);
app_1.default.use(errorHandler_1.globalErrorHandler);
app_1.default.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger UI available at http://localhost:${PORT}/docs`);
});
