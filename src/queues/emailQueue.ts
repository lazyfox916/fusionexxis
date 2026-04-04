import { Queue } from "bullmq";
import { connectRedis } from "../config/db/connectRedis";

const connection = connectRedis();

export const emailQueue = new Queue("email", { connection });

export async function addEmailToQueue(data: {
  to: string;
  subject: string;
  body: string;
}) {
  const result = await emailQueue.add("sendEmail", data, {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  });

  console.log("📩 Email job added to queue with ID:", result.id);
  return result;
}
