import { Button } from "~/components/ui/button"
import { logout } from "~/lib/auth"

export default function LogoutButton() {
  return (
    <form action={logout} method="post">
      <Button name="logout" type="submit">
        Logout
      </Button>
    </form>
  )
}
