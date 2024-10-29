import * as v from "valibot"

export const ServerSchema = v.object({
  NODE_ENV: v.optional(v.picklist(["development", "production", "test"]), "development"),
  TURSO_DATABASE_URL: v.string(),
  TURSO_AUTH_TOKEN: v.string(),
  SESSION_SECRET: v.optional(v.string(), "areallylongsecretthatyoushouldreplace")
})

export const ClientSchema = v.object({})
