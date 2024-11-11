import { A } from "@solidjs/router"

import { Button } from "~/components/ui/button"

export default function Home() {
  return (
    <div class="flex h-screen items-center justify-center">
      <Button as={A} href="/dashboard">
        COME IN!
      </Button>
    </div>
  )
}
