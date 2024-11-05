import { defineConfig } from "drizzle-kit"

import { serverEnv } from "~/env/server"

export default defineConfig({
  schema: "./src/lib/db.ts",
  out: "./migrations",
  dialect: "turso",
  casing: "snake_case",
  dbCredentials: {
    url: serverEnv.TURSO_DATABASE_URL,
    authToken: serverEnv.TURSO_AUTH_TOKEN
  }
})
