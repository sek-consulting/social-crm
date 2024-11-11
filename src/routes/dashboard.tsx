import { createEffect, Suspense, type ParentProps } from "solid-js"
import type { RouteDefinition } from "@solidjs/router"
import { createAsync } from "@solidjs/router"

import { AppSidebar } from "~/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import { getUser } from "~/lib/auth"

export const route: RouteDefinition = {
  preload() {
    return getUser()
  }
}

export default function DashboardLayout(props: ParentProps) {
  const user = createAsync(() => getUser(), { deferStream: true })
  createEffect(() => console.log(user))

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarTrigger />
        <Suspense>{props.children}</Suspense>
      </SidebarInset>
    </SidebarProvider>
  )
}
