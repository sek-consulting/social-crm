import * as v from "valibot"

import { ClientSchema } from "~/env/schema"

const result = v.safeParse(ClientSchema, process.env)

if (result.success === false) {
  console.error("❌ Invalid environment variables", v.flatten<typeof ClientSchema>(result.issues))
  throw new Error("Invalid environment variables")
}

export const clientEnv = result.output
