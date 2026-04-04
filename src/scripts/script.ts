import fs from "fs/promises";
import path from "path";
import Users from "../models/users.model";
import Tasks from "../models/tasks.model";
import { postgres } from "../config/db/connectPostgres";
import { hashPassword } from "../utils/bcrypt";

type UserSeed = {
  id: string;
  name: string;
  email: string;
  password: string;
};

type TaskSeed = {
  id: string;
  title: string;
  description?: string;
  status?: "pending" | "in_progress" | "completed";
  assignedTo?: string;
};

async function readJsonFile<T>(filePath: string): Promise<T> {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data) as T;
}

async function seedUsers(users: UserSeed[]) {
  const preparedUsers = await Promise.all(
    users.map(async (user) => ({
      ...user,
      email: user.email.trim().toLowerCase(),
      password: await hashPassword(user.password),
    })),
  );

  await Users.bulkCreate(preparedUsers, {
    validate: true,
    ignoreDuplicates: true,
  });

  console.log(`✅ Seeded ${preparedUsers.length} users`);
}

async function seedTasks(tasks: TaskSeed[]) {
  await Tasks.bulkCreate(tasks, {
    validate: true,
    ignoreDuplicates: true,
  });

  console.log(`✅ Seeded ${tasks.length} tasks`);
}

async function runSeed() {
  try {
    const usersPath = path.join(
      process.cwd(),
      "src",
      "config",
      "db",
      "seeds",
      "users.json",
    );
    const tasksPath = path.join(
      process.cwd(),
      "src",
      "config",
      "db",
      "seeds",
      "tasks.json",
    );
    const users = await readJsonFile<UserSeed[]>(usersPath);
    const tasks = await readJsonFile<TaskSeed[]>(tasksPath);

    await postgres.authenticate();
    console.log("✅ Connected to database");

    await postgres.sync();

    await seedUsers(users);
    await seedTasks(tasks);

    console.log("🎉 Seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

runSeed();
