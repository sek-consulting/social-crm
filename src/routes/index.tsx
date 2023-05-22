import { type VoidComponent } from "solid-js"

import { Button } from "~/components/ui/button"

const Home: VoidComponent = () => {
  return (
    <main class="flex min-h-screen flex-col items-center justify-center">
      <Button>Hello World!</Button>
    </main>
  )
}

export default Home
