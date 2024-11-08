import { type ParentProps } from "solid-js"
import type { RouteDefinition } from "@solidjs/router"
import { createAsync } from "@solidjs/router"

import { AppSidebar } from "~/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import { getUser } from "~/lib/auth"

export const route: RouteDefinition = {
  preload() {
    return getUser()
  }
}

export default function DashboardLayout(props: ParentProps) {
  const user = createAsync(() => getUser())
  // const AuthContext = createContext<typeof user>()

  return (
    <SidebarProvider>
      {/* <AuthContext.Provider value={user}> */}
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {props.children}
      </main>
      {/* </AuthContext.Provider> */}
    </SidebarProvider>
  )
}
