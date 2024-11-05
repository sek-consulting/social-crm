import { logout } from "~/lib/auth"

// export const route = {
//   preload() {
//     getUser()
//   }
// } satisfies RouteDefinition

export default function Dashboard() {
  // const user = createAsync(() => getUser(), { deferStream: true })
  return (
    <>
      <div>Hello World!</div>
      <form action={logout} method="post">
        <button name="logout" type="submit">
          Logout
        </button>
      </form>
    </>
  )
}
