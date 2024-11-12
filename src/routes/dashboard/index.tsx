import { createEffect } from "solid-js"

import { IconBriefcase, IconMapPin, IconTodo, IconUsers } from "~/components/icons"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { useAuth } from "~/hooks/use-auth"

export default function Dashboard() {
  const user = useAuth()
  // just to show that you how easily you can access the user
  createEffect(() => console.log(user()))

  return (
    <div>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Total Customers</CardTitle>
            <IconUsers class="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">1,234</div>
            <p class="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Active Brands</CardTitle>
            <IconBriefcase class="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">56</div>
            <p class="text-xs text-muted-foreground">+3 new this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Locations</CardTitle>
            <IconMapPin class="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">89</div>
            <p class="text-xs text-muted-foreground">Across 12 countries</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Ongoing Projects</CardTitle>
            <IconTodo class="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">32</div>
            <p class="text-xs text-muted-foreground">7 due this week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
