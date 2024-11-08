import crypto from "crypto"

import { sha256 } from "@oslojs/crypto/sha2"
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding"
import { eq } from "drizzle-orm"
import { useSession } from "vinxi/http"

import { serverEnv } from "~/env/server"
import { db, sessions, takeFirst, users } from "~/lib/db"
import type { Session, User } from "~/lib/db"

const TOKEN_EXPIRATION = 1000 * 60 * 60 * 24 * 30 // 30 days

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20)
  crypto.getRandomValues(bytes)
  const token = encodeBase32LowerCaseNoPadding(bytes)
  return token
}

export async function createSession(token: string, userId: number): Promise<Session> {
  "use server"
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  const session: Session = {
    id: sessionId,
    userId: userId,
    expiresAt: new Date(Date.now() + TOKEN_EXPIRATION)
  }
  await db.insert(sessions).values(session)
  return session
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null }

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
  "use server"
  if (!token) {
    return { session: null, user: null }
  }
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

  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessions).where(eq(sessions.id, session.id))
    return { session: null, user: null }
  }

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
  "use server"
  await db.delete(sessions).where(eq(sessions.id, sessionId))
}

export type SessionCookie = {
  token: string | undefined
}

export async function getSessionCookie() {
  "use server"
  return await useSession<SessionCookie>({ password: serverEnv.SESSION_SECRET })
}

export async function setSessionTokenCookie(token: string) {
  "use server"
  const cookie = await getSessionCookie()
  await cookie.update((data: SessionCookie) => ((data.token = token), data))
}

export async function deleteSessionTokenCookie() {
  "use server"
  const cookie = await getSessionCookie()
  await cookie.update((data: SessionCookie) => (data.token = undefined))
}
