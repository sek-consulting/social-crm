import { LogoutButton } from "~/components/logout-button"
import { useAuth } from "~/hooks/use-auth"

export default function Dashboard() {
  const _user = useAuth()

  return (
    <>
      <div>Hello World!</div>
      <LogoutButton />
    </>
  )
}
