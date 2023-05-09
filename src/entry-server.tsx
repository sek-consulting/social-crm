import { redirect } from "solid-start"

import { getSession } from "@solid-auth/base"
import { StartServer, createHandler, renderAsync } from "solid-start/entry-server"

import { authOptions } from "~/server/auth"

export default createHandler(
  // session middleware
  ({ forward }) => {
    return async (event) => {
      const url = new URL(event.request.url)

      const isApiPage = ["/api/", "/_m/"].some((s) => url.pathname.startsWith(s))
      const isAuthPage = url.pathname.startsWith("/auth/")

      if (isApiPage) {
        return forward(event)
      }

      const session = await getSession(event.request, authOptions)
      const isAuth = !!session

      if (isAuthPage) {
        if (isAuth) {
          // no need to be on an auth page if you're logged in
          return redirect("/")
        }
        return forward(event)
      }

      if (!isAuth) {
        let from = url.pathname
        if (url.search) {
          from += url.search
        }
        // redirect to the login page if not logged in
        return redirect(`/auth/login?from=${encodeURIComponent(from)}`)
      }
      return forward(event)
    }
  },
  renderAsync((event) => <StartServer event={event} />)
)
