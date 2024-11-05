import type { ParentProps } from "solid-js"

import { AppSidebar } from "~/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"

export default function DashboardLayout(props: ParentProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {props.children}
      </main>
    </SidebarProvider>
  )
}
