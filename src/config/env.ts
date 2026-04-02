import dotenv from "dotenv";
dotenv.config();

export const DATABASE_URL = process.env.DATABASE_URL;
export const SSL = process.env.SSL;
export const REDIS_URI = process.env.REDIS_URL;
