import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email.")
    .email("The email address is badly formatted."),
  password: z.string().min(1, "Please enter your password.")
})
