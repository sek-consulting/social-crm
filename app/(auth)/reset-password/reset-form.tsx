"use client"

import * as React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Icons } from "~/components/icons"
import { Button, buttonVariants } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { toast } from "~/lib/hooks/use-toast"
import { cn } from "~/lib/utils"
import { passResetSchema } from "~/lib/validation/auth"

interface PasswordResetProps extends React.HtmlHTMLAttributes<HTMLFormElement> {}

type FormData = z.infer<typeof passResetSchema>

export function ResetPasswordForm({ className, ...props }: PasswordResetProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ resolver: zodResolver(passResetSchema) })

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  //const mutation = api.auth.sendResetMail.useMutation()
  const mutation = useMutation({
    mutationFn: (email: string) => {
      return fetch("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ email: email })
      })
    }
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    // await fetch("/api/auth/reset-password", {
    //   method: "POST"
    // })
    mutation.mutate(data.email)

    setIsLoading(false)

    return toast({
      title: "Success",
      description: "Check your mails for a reset link."
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className} {...props}>
      <div className="flex max-w-md flex-col space-y-8 px-4 py-8">
        <h1 className="text-center text-2xl font-bold tracking-tighter">Password Reset</h1>
        <p className="text-primary/60">
          Enter your email and we&apos;ll send you instructions on how to reset your password.
        </p>
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
          {errors?.email && <p className="pt-2 text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="flex flex-col">
          <Button disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Reset
          </Button>
          <Link href={"/login"} className={cn(buttonVariants({ variant: "link" }))}>
            Go back to Login Page
          </Link>
        </div>
      </div>
    </form>
  )
}
