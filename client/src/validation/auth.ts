import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(6),
});

export type SignupFormData = z.infer<typeof signupSchema>;


export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
})

export type loginFormData = z.infer<typeof loginSchema>;