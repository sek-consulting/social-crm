import { query$ } from "@prpc/solid"
import { z } from "zod"

import { withUser } from "~/server/api/middleware"

export const helloQuery = query$({
  schema: z.object({ name: z.string() }),
  queryFn: ({ payload }) => {
    return `server says hello: ${payload.name}`
  },
  key: "hello"
})

export const protectedQuery = query$({
  queryFn: ({ ctx$ }) => {
    return `protected -${ctx$.user.name}`
  },
  key: "protected-1",
  middlewares: [withUser]
})
