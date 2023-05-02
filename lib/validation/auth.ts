import * as z from "zod"

export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4)
})

export const passResetSchema = z.object({
  email: z.string().email()
})
