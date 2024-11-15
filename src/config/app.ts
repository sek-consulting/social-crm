import { IconBriefcase, IconDashboard, IconMapPin, IconTodo, IconUsers } from "~/components/icons"

export const appConfig = {
  mainNav: [
    { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
    { title: "Clients", url: "/clients", icon: IconUsers },
    { title: "Brands", url: "/brands", icon: IconBriefcase },
    { title: "Locations", url: "/locations", icon: IconMapPin },
    { title: "Projects", url: "/projects", icon: IconTodo }
  ]
}
