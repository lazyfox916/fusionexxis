import app from "./app";
import { testPostgresConnection } from "./config/db/connectPostgres";
import { connectRedis } from "./config/db/connectRedis";

const PORT = 5000;

connectRedis();
testPostgresConnection();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
