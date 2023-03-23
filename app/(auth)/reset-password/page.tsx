import { Card } from "~/components/layout/card"
import { ResetPasswordForm } from "~/components/reset-password-form"

export default function ResetPasswordPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Card>
        <ResetPasswordForm />
      </Card>
    </div>
  )
}
