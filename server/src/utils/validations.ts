import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(4),
  email: z.email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const createTodoSchema = z.object({
  title: z.string().trim(),
  description: z.string().trim(),
  status: z.enum(["todo", "in-progress", "done"]).default("todo"),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  tags: z.array(z.string()).default([]),
  subTask: z
    .array(
      z.object({
        title: z.string().trim(),
        description: z.string().trim(),
        completed: z.boolean().default(false),
        createdAt: z.date().optional(),
      }),
    )
    .default([]),
});
