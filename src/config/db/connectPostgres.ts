import { Sequelize } from "sequelize";

import { DATABASE_URL, SSL } from "../env";

export const postgres = new Sequelize(DATABASE_URL as string, {
  dialect: "postgres",
  logging: false,
  timezone: "+05:45",
  pool: {
    max: 50,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    ssl: SSL === "true" ? { require: true, rejectUnauthorized: false } : false,
  },
});

export const testPostgresConnection = async () => {
  try {
    await postgres.authenticate();
    await postgres.sync({ alter: false });
    console.info(
      "\x1b[38;5;34m 👾 Postgres Database Synced Successfully. \x1b[0m",
    );
    console.info("\x1b[38;5;34m ✅ Connected to Postgres Database... \x1b[0m");
  } catch (error) {
    console.error("❌ Unable to connect to Postgres:", error);
  }
};
