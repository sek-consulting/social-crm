import { Card } from "~/components/ui/card"

import { ResetPasswordForm } from "./reset-form"

export default function ResetPasswordPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Card>
        <ResetPasswordForm />
      </Card>
    </div>
  )
}
