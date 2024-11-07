import { type RequestMiddleware } from "@solidjs/start/middleware"

import { getHeader } from "vinxi/http"

function getHost(url: string) {
  try {
    return new URL(url).host || null
  } catch {
    return null
  }
}

function verifyRequestOrigin(originHeader: string, hostHeader: string) {
  const origin = getHost(originHeader)
  if (!origin) {
    return false
  }

  let host
  if (hostHeader.startsWith("http://") || hostHeader.startsWith("https://")) {
    host = getHost(hostHeader)
  } else {
    host = getHost("https://" + hostHeader)
  }

  return origin === host
}

export const csrfProtection: RequestMiddleware = (event) => {
  if (event.request.method !== "GET") {
    const origin =
      (getHeader(event.nativeEvent, "Origin") || getHeader(event.nativeEvent, "Referrer")) ?? null
    const host = getHeader(event.nativeEvent, "Host") ?? null

    if (!origin || !host || !verifyRequestOrigin(origin, host)) {
      event.nativeEvent.respondWith(new Response(null, { status: 403 }))
      return
    }
  }
}
