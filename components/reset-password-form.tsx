"use client"

import * as React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Icons } from "~/components/icons"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { toast } from "~/hooks/use-toast"

interface PasswordResetProps extends React.HtmlHTMLAttributes<HTMLFormElement> {}

const passwordResetSchema = z.object({
  email: z.string().email()
})

type FormData = z.infer<typeof passwordResetSchema>

export function ResetPasswordForm({ className, ...props }: PasswordResetProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ resolver: zodResolver(passwordResetSchema) })

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    console.log("onSubmit", data)
    //doStuff
    setIsLoading(false)

    const resetReturn = { ok: true }

    if (!resetReturn?.ok) {
      return toast({
        title: "Error",
        description: "EMail not found.",
        variant: "destructive"
      })
    }
    return toast({
      title: "Success",
      description: "Check your mails!"
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className} {...props}>
      <div className="flex flex-col space-y-8 py-8">
        <h1 className="text-center text-2xl font-bold tracking-tighter">Password Reset</h1>
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col">
            <Input
              id="email"
              placeholder="name@mail.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            {errors?.email && <p className="pt-2 text-xs text-red-600">{errors.email.message}</p>}
          </div>
          <Button variant="primary" disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Reset
          </Button>
        </div>
      </div>
    </form>
  )
}
