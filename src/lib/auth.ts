import crypto from "crypto"

import { action, query, redirect } from "@solidjs/router"

import { sha256 } from "@oslojs/crypto/sha2"
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding"
import { eq } from "drizzle-orm"
import { useSession } from "vinxi/http"

import { serverEnv } from "~/env/server"
import { db, sessions, takeFirst, users } from "~/lib/db"
import type { Session, User } from "~/lib/db"

const TOKEN_EXPIRATION = 1000 * 60 * 60 * 24 * 30 // 30 days

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null }

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20)
  crypto.getRandomValues(bytes)
  const token = encodeBase32LowerCaseNoPadding(bytes)
  return token
}

export async function createSession(token: string, userId: number): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  const session: Session = {
    id: sessionId,
    userId: userId,
    expiresAt: new Date(Date.now() + TOKEN_EXPIRATION)
  }
  await db.insert(sessions).values(session)
  return session
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  const result = await db
    .select({ user: users, session: sessions })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(eq(sessions.id, sessionId))
    .then(takeFirst)

  if (!result) {
    return { session: null, user: null }
  }
  const { user, session } = result

  // session expired
  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessions).where(eq(sessions.id, session.id))
    return { session: null, user: null }
  }

  // refresh session if less than 50% time left
  if (Date.now() >= session.expiresAt.getTime() - TOKEN_EXPIRATION / 2) {
    session.expiresAt = new Date(Date.now() + TOKEN_EXPIRATION)
    await db
      .update(sessions)
      .set({
        expiresAt: session.expiresAt
      })
      .where(eq(sessions.id, session.id))
  }
  return { session, user }
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.id, sessionId))
}

export async function setSessionTokenCookie(token: string) {
  const cookie = await useSession({ password: serverEnv.SESSION_SECRET })
  await cookie.update((data) => {
    data.token = token
  })
}

export async function deleteSessionTokenCookie() {
  const cookie = await useSession({ password: serverEnv.SESSION_SECRET })
  await cookie.update((data) => {
    data.token = undefined
  })
}

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

export const logout = action(async () => {
  "use server"
  await deleteSessionTokenCookie()
  throw redirect("/login")
})
