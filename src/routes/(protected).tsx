import { createMemo, Index, Show, Suspense, type ParentProps } from "solid-js"
import type { RouteDefinition } from "@solidjs/router"
import { createAsync, useLocation } from "@solidjs/router"

import { AppSidebar } from "~/components/app-sidebar"
import { ModeToggle } from "~/components/mode-toggle"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator
} from "~/components/ui/breadcrumb"
import { Separator } from "~/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import { UserNav } from "~/components/user-nav"
import { AuthProvider } from "~/hooks/use-auth"
import { getUser } from "~/lib/auth"
import { cn } from "~/lib/utils"

export const route: RouteDefinition = {
  preload() {
    return getUser()
  }
}

function split(path: string) {
  if (!path) return []
  return path
    .split("/")
    .filter((segment) => segment !== "")
    .map((segment) =>
      segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    )
}

export default function ProtectedLayout(props: ParentProps) {
  const user = createAsync(() => getUser(), { deferStream: true })

  const location = useLocation()
  const pathList = createMemo(() => split(location.pathname))

  return (
    <Suspense fallback="loading...">
      <AuthProvider user={user}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header class="flex h-12 shrink-0 items-center justify-between gap-2 border-b px-2">
              <div class="flex items-center gap-2">
                <SidebarTrigger class="size-8" />
                <Separator orientation="vertical" class="mr-2 h-4" />
                <Breadcrumb class="hidden md:block">
                  <BreadcrumbList>
                    <Index each={pathList()}>
                      {(path, idx) => (
                        <>
                          <Show when={idx > 0}>
                            <BreadcrumbSeparator />
                          </Show>
                          <BreadcrumbItem
                            class={cn(idx === pathList().length - 1 && "text-foreground")}
                          >
                            {path()}
                          </BreadcrumbItem>
                        </>
                      )}
                    </Index>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div class="flex items-center gap-2">
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
