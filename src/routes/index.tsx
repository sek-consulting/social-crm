import { createSignal, type VoidComponent } from "solid-js"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { ToastProvider } from "~/components/ui/toast"
import { showToast } from "~/lib/use-toast"

const Home: VoidComponent = () => {
  const [title, setTitle] = createSignal("titel")
  const [desc, setDesc] = createSignal("ich bin eine beschreibung")

  return (
    <main class="flex min-h-screen flex-col items-center justify-center">
      <div class="w-[300px]">
        <Input value={title()} onChange={(e) => setTitle(e.target.value)} />
        <Input value={desc()} onChange={(e) => setDesc(e.target.value)} />
        <Button
          onClick={() => {
            showToast({ toastId: 0, title: title(), description: desc() })
          }}
        >
          Click me!
        </Button>
      </div>
      <ToastProvider />
    </main>
  )
}

export default Home
