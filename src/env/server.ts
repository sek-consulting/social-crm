import * as v from "valibot"

import { ServerSchema } from "~/env/schema"

const result = v.safeParse(ServerSchema, process.env)

if (result.success === false) {
  console.error("❌ Invalid environment variables", v.flatten<typeof ServerSchema>(result.issues))
  throw new Error("Invalid environment variables")
}

export const serverEnv = result.output
