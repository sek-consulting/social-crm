import { For } from "solid-js"

import { A } from "@solidjs/router"

import { IconCalendar, IconHome, IconInbox, IconSearch, IconSettings } from "~/components/icons"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "~/components/ui/sidebar"

const items = [
  { title: "Home", url: "#", icon: IconHome },
  { title: "Inbox", url: "#", icon: IconInbox },
  { title: "Calendar", url: "#", icon: IconCalendar },
  { title: "Search", url: "#", icon: IconSearch },
  { title: "Settings", url: "#", icon: IconSettings }
]

export function AppSidebar() {
  return (
    <Sidebar variant="floating">
      <SidebarHeader>HEADER</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <For each={items}>
                {(item) => (
                  <SidebarMenuItem>
                    <SidebarMenuButton as={A} href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </For>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>FOOTER</SidebarFooter>
    </Sidebar>
  )
}
