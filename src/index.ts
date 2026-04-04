import app from "./app";
import { initAssociations } from "./models/associations";
import { testPostgresConnection } from "./config/db/connectPostgres";
import userRoutes from "./routes/users.route";
import tasksRoutes from "./routes/tasks.route";
import swaggerUi from "swagger-ui-express";
import { openapiSpec } from "./docs/openapi";
import { globalErrorHandler, notFound } from "./middlewares/errorHandler";
import "./workers/worker";

const PORT = Number(process.env.PORT) || 8080;

initAssociations();
testPostgresConnection();

app.use("/api/users", userRoutes);
app.use("/api/tasks", tasksRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));

app.use(notFound);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/docs`);
});
