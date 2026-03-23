import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  MONGO_URI: z.string().min(1, "MONGO_URI is required"),
  PORT: z.coerce.number().positive().default(5000),
  JWT_ACCESS_SECRET: z
    .string()
    .min(8, "JWT_ACCESS_SECRET must be at least 8 characters"),
  JWT_REFRESH_SECRET: z
    .string()
    .min(8, "JWT_REFRESH_SECRET must be at least 8 characters"),
  JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),
  CORS_ORIGIN: z.string().min(1).default("http://localhost:5173"),
});

export const env = envSchema.parse(process.env);
