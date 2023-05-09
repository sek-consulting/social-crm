import { middleware$, error$ } from "@prpc/solid"
import { getSession } from "@solid-auth/base"

import { authOptions } from "~/server/auth"

export const withUser = middleware$(async ({ request$ }) => {
  const session = await getSession(request$, authOptions)
  if (!session || !session.user) {
    return error$("You can't do that!")
  }
  return {
    user: session.user
  }
})
