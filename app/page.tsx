import { getCurrentUser } from "~/lib/session"

export default async function IndexPage() {
  // user can only be received in async server components
  const user = await getCurrentUser()
  console.log(user)

  return (
    <div>
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <h1>HELLO DEV!</h1>
      </div>
    </div>
  )
}
