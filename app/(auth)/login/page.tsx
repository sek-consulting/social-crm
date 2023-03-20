import { Metadata } from "next"

import { Card } from "~/components/layout/card"
import { Flex } from "~/components/layout/flex"
import { LoginForm } from "~/components/login-form"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account"
}

export default function LoginPage() {
  return (
    <Flex className="h-screen" justifyContent="center" alignItems="center">
      <Card>
        <LoginForm />
      </Card>
    </Flex>
  )
}
