import { Avatar, AvatarFallback } from "~/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu"
import { logout } from "~/lib/auth"

import { IconLogout } from "./icons"

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger as={Avatar} class="size-8 rounded-md">
        <AvatarFallback>EK</AvatarFallback>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <form action={logout} method="post">
          <DropdownMenuItem as="button" type="submit" class="w-full">
            <IconLogout class="mr-2" />
            Log out
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
