import { z } from "zod"

export const serverScheme = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  AUTH_SECRET: z.string(),
  AUTH_URL: z.string().optional(),
  DATABASE_URL: z.string()
})

export const clientScheme = z.object({
  MODE: z.enum(["development", "production", "test"]).default("development")
})
