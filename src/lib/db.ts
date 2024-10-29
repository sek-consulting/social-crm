import { createClient } from "@libsql/client"
import type { InferSelectModel } from "drizzle-orm"
import { drizzle } from "drizzle-orm/libsql"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

import { serverEnv } from "~/env/server"

const client = createClient({
  url: serverEnv.TURSO_DATABASE_URL,
  authToken: serverEnv.TURSO_AUTH_TOKEN
})
export const db = drizzle(client, { casing: "snake_case" })

export const takeFirst = <T>(values: T[]) => {
  if (values.length > 0) return values[0]
}

export const userTable = sqliteTable("user", {
  id: integer().primaryKey(),
  email: text().notNull(),
  password: text().notNull()
})

export const sessionTable = sqliteTable("session", {
  id: text().primaryKey(),
  userId: integer()
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer({ mode: "timestamp" }).notNull()
})

export type User = InferSelectModel<typeof userTable>
export type Session = InferSelectModel<typeof sessionTable>
