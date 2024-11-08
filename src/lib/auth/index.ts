import { action, query, redirect, revalidate } from "@solidjs/router"

import { eq } from "drizzle-orm"

import { verifyPasswordHash } from "~/lib/auth/password"
import {
  createSession,
  deleteSessionTokenCookie,
  generateSessionToken,
  getSessionCookie,
  setSessionTokenCookie,
  validateSessionToken
} from "~/lib/auth/session"
import { db, takeFirst, users } from "~/lib/db"

export const login = action(async (data: { email: string; password: string }) => {
  "use server"

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, data.email))
    .then(takeFirst)

  if (!existingUser) {
    return new Error("Incorrect email or password.")
  }

  const validPassword = await verifyPasswordHash(existingUser.passwordHash, data.password)
  if (!validPassword) {
    return new Error("Incorrect email or password.")
  }

  const sessionToken = generateSessionToken()
  await createSession(sessionToken, existingUser.id)
  await setSessionTokenCookie(sessionToken)

  return redirect("/dashboard")
})

export const logout = action(async () => {
  "use server"
  await deleteSessionTokenCookie()
  return revalidate("getUser")
})

export const getUser = query(async () => {
  "use server"
  const cookie = await getSessionCookie()
  const { user } = await validateSessionToken(cookie.data.token ?? "")
  if (user === null) {
    //await deleteSessionTokenCookie() // <-- this crashes the application
    console.log("no user -> redirect")
    throw redirect("/login")
  }
  return user
}, "getUser")
