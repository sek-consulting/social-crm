import { Suspense, type ParentProps } from "solid-js"
import type { RouteDefinition } from "@solidjs/router"
import { createAsync } from "@solidjs/router"

import { AppSidebar } from "~/components/app-sidebar"
import { ModeToggle } from "~/components/mode-toggle"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import { UserMenu } from "~/components/user-menu"
import { AuthProvider } from "~/hooks/use-auth"
import { getUser } from "~/lib/auth"

export const route: RouteDefinition = {
  preload() {
    return getUser()
  }
}

export default function DashboardLayout(props: ParentProps) {
  const user = createAsync(() => getUser(), { deferStream: true })

  return (
    <Suspense fallback="loading...">
      <AuthProvider user={user}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header class="flex h-12 shrink-0 items-center justify-between gap-2 border-b px-2">
              <div>
                <SidebarTrigger />
              </div>
              <div class="flex items-center gap-2">
                <ModeToggle />
                <UserMenu />
              </div>
            </header>
            <div class="p-4">{props.children}</div>
          </SidebarInset>
        </SidebarProvider>
      </AuthProvider>
    </Suspense>
  )
}
