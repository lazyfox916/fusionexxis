const Redis = require("ioredis");
const { REDIS_URI } = require("../env");

export const connectRedis = () => {
  const redisUrl = REDIS_URI ?? "redis://127.0.0.1:6380";

  if (!REDIS_URI) {
    console.warn("REDIS_URL not set; defaulting to redis://127.0.0.1:6380");
  }

  const redis = new Redis(redisUrl, {
    maxRetriesPerRequest: null,
  });

  redis.on("error", (err: Error) => {
    console.error("\x1b[31m Redis Connection Error:", err, "\x1b[0m");
  });

  (async () => {
    try {
      await redis.set("test_key", "Hello Redis!");
    } catch (err) {
      console.error("Redis test failed:", err);
    }
  })();

  return redis;
};
