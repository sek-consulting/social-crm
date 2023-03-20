import { Metadata } from "next"

import { LoginForm } from "~/components/login-form"
import { Card } from "~/components/ui/card"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account"
}

export default function LoginPage() {
  return (
    <main className="flex h-screen items-center justify-center">
      <Card>
        <LoginForm />
      </Card>
    </main>
  )
}
