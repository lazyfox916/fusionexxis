const Redis = require("ioredis");
const { REDIS_URI } = require("../env");

export const connectRedis = () => {
  const redis = new Redis(REDIS_URI);

  redis.on("connect", () => {
    console.info("\x1b[38;5;34m ✅ Redis Connected Successfully \x1b[0m");
  });

  redis.on("error", (err: Error) => {
    console.error("\x1b[31m ❌ Redis Connection Error:", err, "\x1b[0m");
  });

  (async () => {
    await redis.set("test_key", "Hello Redis!");
    const value = await redis.get("test_key");
    console.info("\x1b[38;5;34, 🔑 Test_KEY:", value, "\x1b[0m");
  })();

  return redis;
};
