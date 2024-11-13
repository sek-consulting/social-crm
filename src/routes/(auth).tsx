import { type ParentProps } from "solid-js"

import { IconLogo } from "~/components/icons"

export default function AuthLayout(props: ParentProps) {
  return (
    <div class="grid h-screen lg:grid-cols-2">
      <div class="hidden size-full flex-col justify-between border-r border-sidebar-border bg-sidebar p-12 text-sidebar-foreground lg:flex">
        <div class="flex items-center font-bold">
          <IconLogo class="mr-2 size-6" /> SOCIAL CRM
        </div>
        <blockquote class="border-l-2 pl-6 italic">
          “If we want users to like our software, we should design it to behave like a likeable
          person.” ~Alan Cooper
        </blockquote>
      </div>
      <main class="flex items-center justify-center p-4">{props.children}</main>
    </div>
  )
}
