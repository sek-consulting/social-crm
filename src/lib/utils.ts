import { getRequestEvent } from "solid-js/web"
import { query, redirect } from "@solidjs/router"

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAuthenticatedUser = query(async () => {
  "use server"
  const event = getRequestEvent()!
  if (!event.locals.user) {
    throw redirect("/login")
  }
  return event.locals.user
}, "getAuthenticatedUser")
