import { Worker, Job } from "bullmq";
import { connectRedis } from "../config/db/connectRedis";
import { sendMail } from "../utils/sendMail";
import { SMTP_EMAIL, SMTP_PASS } from "../config/env";

const connection = connectRedis();

if (!SMTP_EMAIL || !SMTP_PASS) {
  console.error(
    "❌ Missing SMTP creds. Set SMTP_EMAIL and SMTP_PASS in your .env before running the worker.",
  );
  process.exit(1);
}

type EmailJobData = {
  to: string;
  subject: string;
  body: string;
};

const worker = new Worker(
  "email",
  async (job: Job<EmailJobData>) => {
    console.log(`Processing email job ${job.id}`);

    const { to, subject, body } = job.data;

    await sendMail({
      from: `"Fusionexis" <${SMTP_EMAIL}>`,
      to,
      subject,
      text: body,
      html: `<p>${body}</p>`,
    });

    console.log(`📨 Email sent to ${to}`);
  },
  { connection },
);

worker.on("ready", () => {
  console.log("Email worker is ready and waiting for jobs");
});

worker.on("completed", (job) => {
  console.log(`Completed email job ${job.id}`);
});

worker.on("failed", (job, err) => {
  console.error(`Failed email job ${job?.id}:`, err);
});

worker.on("error", (err) => {
  console.error("Worker error:", err);
});
