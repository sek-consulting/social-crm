import { createMiddleware } from "@solidjs/start/middleware"

import { csrfProtection } from "~/middleware/csrf-protection"

export default createMiddleware({
  onRequest: [csrfProtection]
})
