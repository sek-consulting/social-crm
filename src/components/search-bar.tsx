import { createEffect, createSignal, For, onCleanup } from "solid-js"
import { useNavigate } from "@solidjs/router"

import { IconCommand } from "~/components/icons"
import { Button } from "~/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "~/components/ui/command"
import { appConfig } from "~/config/app"

export default function SearchBar() {
  const [open, setOpen] = createSignal(false)

  createEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)

    onCleanup(() => document.removeEventListener("keydown", down))
  })

  const navigate = useNavigate()
  const redirect = (url: string) => {
    setOpen(false)
    navigate(url)
  }

  return (
    <>
      <Button
        id="search-trigger"
        variant="outline"
        class="flex h-8 w-48 items-center justify-between bg-muted/50 p-1 pl-2 text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        <span>Search...</span>
        <kbd class="pointer-events-none flex select-none items-center gap-1 rounded border bg-muted px-1.5 py-0.5 font-mono text-xs font-medium">
          <IconCommand stroke-width={1} />
          <span>K</span>
        </kbd>
      </Button>
      <CommandDialog open={open()} onOpenChange={setOpen}>
        <CommandInput placeholder="Search application..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <For each={appConfig.mainNav}>
              {(item) => (
                <CommandItem onSelect={() => redirect(item.url)}>
                  <item.icon class="mr-2" />
                  {item.title}
                </CommandItem>
              )}
            </For>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
