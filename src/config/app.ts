import { IconBriefcase, IconDashboard, IconUsers } from "~/components/icons"

export const appConfig = {
  mainNav: [
    { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
    { title: "Clients", url: "/clients", icon: IconUsers },
    { title: "Brands", url: "/brands", icon: IconBriefcase }
  ]
}
