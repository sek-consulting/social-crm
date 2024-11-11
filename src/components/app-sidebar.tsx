import { For } from "solid-js"
import { A } from "@solidjs/router"

import {
  IconCalendar,
  IconHome,
  IconLogo,
  IconMail,
  IconSearch,
  IconSettings
} from "~/components/icons"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "~/components/ui/sidebar"

const items = [
  {
    title: "Home",
    url: "#",
    icon: IconHome
  },
  {
    title: "Inbox",
    url: "#",
    icon: IconMail
  },
  {
    title: "Calendar",
    url: "#",
    icon: IconCalendar
  },
  {
    title: "Search",
    url: "#",
    icon: IconSearch
  },
  {
    title: "Settings",
    url: "#",
    icon: IconSettings
  }
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuButton
          class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          size="lg"
          as={A}
          href="/"
          tooltip="SOCIAL CRM"
        >
          <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <IconLogo />
          </div>{" "}
          SOCIAL CRM
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <For each={items}>
                {(item) => (
                  <SidebarMenuItem>
                    <SidebarMenuButton as={A} href={item.url} tooltip={item.title}>
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
    </Sidebar>
  )
}
