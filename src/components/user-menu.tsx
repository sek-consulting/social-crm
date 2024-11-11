import { Avatar, AvatarFallback } from "~/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu"

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger as={Avatar} class="size-8">
        <AvatarFallback>EK</AvatarFallback>
      </DropdownMenuTrigger>
      <DropdownMenuContent>Hello world</DropdownMenuContent>
    </DropdownMenu>
  )
}
