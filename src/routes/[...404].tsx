import { A } from "@solidjs/router"

import { IconMoodNeutral } from "~/components/icons"
import { Button } from "~/components/ui/button"

export default function NotFound() {
  return (
    <main class="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <IconMoodNeutral class="size-32 md:size-48" />
      <h1 class="text-4xl font-extrabold tracking-tighter md:text-6xl">Oops! Page not found.</h1>
      <p class="text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button as={A} href="/">
        Go back home
      </Button>
    </main>
  )
}
