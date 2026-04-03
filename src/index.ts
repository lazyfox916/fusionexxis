import app from "./app";
import { initAssociations } from "./models/associations";
import { testPostgresConnection } from "./config/db/connectPostgres";
import { connectRedis } from "./config/db/connectRedis";
import userRoutes from "./routes/users.route";
import { globalErrorHandler, notFound } from "./middlewares/errorHandler";

const PORT = 5000;

connectRedis();

initAssociations();
testPostgresConnection();

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
