import { createSignal, Show } from "solid-js"
import type { ComponentProps } from "solid-js"

import { IconEye, IconEyeOff } from "~/components/icons"
import { Button } from "~/components/ui/button"
import { TextFieldInput } from "~/components/ui/text-field"

export function PasswordInput(props: ComponentProps<typeof TextFieldInput>) {
  const [hidden, setHidden] = createSignal(true)
  return (
    <div class="relative">
      <TextFieldInput type={hidden() ? "password" : "text"} {...props} />
      <Button
        variant="ghost"
        class="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setHidden((b) => !b)}
      >
        <Show when={hidden()} fallback={<IconEyeOff />}>
          <IconEye />
        </Show>
      </Button>
    </div>
  )
}
