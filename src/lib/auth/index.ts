import { action, query, redirect } from "@solidjs/router"

import { eq } from "drizzle-orm"
import { useSession } from "vinxi/http"

import { serverEnv } from "~/env/server"
import { verifyPasswordHash } from "~/lib/auth/password"
import {
  createSession,
  deleteSessionTokenCookie,
  generateSessionToken,
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
  const session = await createSession(sessionToken, existingUser.id)
  console.log("session", session)
  await setSessionTokenCookie(sessionToken)

  return redirect("/dashboard")
})

export const logout = action(async () => {
  "use server"
  await deleteSessionTokenCookie()
  throw redirect("/login")
})

export const getUser = query(async () => {
  "use server"
  try {
    console.log("getuser")
    const cookie = await useSession({ password: serverEnv.SESSION_SECRET })
    const token = cookie.data.token
    console.log("token", cookie.data)
    if (token === null) {
      throw new Error("Token not found")
    }
    const { user } = await validateSessionToken(token)
    console.log("user", user)
    if (user === null) {
      throw new Error("User not found")
    }
    return user
  } catch (err) {
    console.log("error", err)
    await deleteSessionTokenCookie()
    throw redirect("/login")
  }
}, "getUser")
