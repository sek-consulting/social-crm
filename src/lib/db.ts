import { createClient } from "@libsql/client"
import type { InferSelectModel } from "drizzle-orm"
import { drizzle } from "drizzle-orm/libsql"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

import { serverEnv } from "~/env/server"

const client = createClient({
  url: serverEnv.TURSO_DATABASE_URL,
  authToken: serverEnv.TURSO_AUTH_TOKEN
})
export const db = drizzle(client, {
  casing: "snake_case",
  logger: serverEnv.NODE_ENV === "development"
})

export const takeFirst = <T>(values: T[]) => {
  if (values.length > 0) return values[0]
}

export const users = sqliteTable("users", {
  id: integer().primaryKey(),
  email: text().notNull(),
  passwordHash: text().notNull()
})

export const sessions = sqliteTable("sessions", {
  id: text().primaryKey(),
  userId: integer()
    .notNull()
    .references(() => users.id),
  expiresAt: integer({ mode: "timestamp" }).notNull()
})

export type User = InferSelectModel<typeof users>
export type Session = InferSelectModel<typeof sessions>
