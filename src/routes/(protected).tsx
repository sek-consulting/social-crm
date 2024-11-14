import { Suspense, type ParentProps } from "solid-js"
import type { RouteDefinition } from "@solidjs/router"
import { createAsync } from "@solidjs/router"

import { AppSidebar } from "~/components/app-sidebar"
import { ModeToggle } from "~/components/mode-toggle"
import SearchBar from "~/components/search-bar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import { UserNav } from "~/components/user-nav"
import { AuthProvider } from "~/hooks/use-auth"
import { getUser } from "~/lib/auth"

export const route: RouteDefinition = {
  preload() {
    return getUser()
  }
}

export default function ProtectedLayout(props: ParentProps) {
  const user = createAsync(() => getUser(), { deferStream: true })

  return (
    <Suspense fallback="loading...">
      <AuthProvider user={user}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header class="flex h-12 shrink-0 items-center justify-between gap-2 border-b px-2">
              <div class="flex items-center gap-2">
                <SidebarTrigger class="size-8" />
              </div>
              <div class="flex items-center gap-2">
                <SearchBar />
                <ModeToggle />
                <UserNav />
              </div>
            </header>
            <div class="p-4">{props.children}</div>
          </SidebarInset>
        </SidebarProvider>
      </AuthProvider>
    </Suspense>
  )
}
