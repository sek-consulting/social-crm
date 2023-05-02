import { Metadata } from "next"

import { Card } from "~/components/ui/card"

import { LoginForm } from "./login-form"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account"
}

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Card>
        <LoginForm />
      </Card>
    </div>
  )
}
