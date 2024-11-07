import { type RequestMiddleware } from "@solidjs/start/middleware"

import { getHeader } from "vinxi/http"

function getHost(url: string) {
  try {
    return new URL(url).host || null
  } catch {
    return null
  }
}

export function verifyRequestOrigin(origin: string, allowedDomains: string[]): boolean {
  if (!origin || allowedDomains.length === 0) {
    return false
  }
  const originHost = getHost(origin)
  if (!originHost) {
    return false
  }
  for (const domain of allowedDomains) {
    let host: string | null
    if (domain.startsWith("http://") || domain.startsWith("https://")) {
      host = getHost(domain)
    } else {
      host = getHost("https://" + domain)
    }
    if (originHost === host) {
      return true
    }
  }
  return false
}

export const csrfProtection: RequestMiddleware = (event) => {
  if (event.request.method !== "GET") {
    const origin =
      (getHeader(event.nativeEvent, "Origin") || getHeader(event.nativeEvent, "Referrer")) ?? null
    const host = getHeader(event.nativeEvent, "Host") ?? null

    if (!origin || !host || !verifyRequestOrigin(origin, [host])) {
      event.nativeEvent.respondWith(new Response(null, { status: 403 }))
      return
    }
  }
}
