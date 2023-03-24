"use client"

import * as React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { redirect, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Icons } from "~/components/icons"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { toast } from "~/hooks/use-toast"
import { userAuthSchema } from "~/lib/validation/auth"

interface LoginFormProps extends React.HTMLAttributes<HTMLFormElement> {}

type FormData = z.infer<typeof userAuthSchema>

export function LoginForm({ className, ...props }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ resolver: zodResolver(userAuthSchema) })

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false)
  const searchParams = useSearchParams()

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const signinReturn = await signIn("credentials", {
      email: data.email.toLowerCase(),
      password: data.password,
      redirect: false,
      callbackUrl: searchParams?.get("from") || "/"
    })
    setIsLoading(false)

    if (!signinReturn?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your login request failed. Please try again.",
        variant: "destructive"
      })
    }
    setIsSuccess(true)
  }

  React.useEffect(() => {
    if (isSuccess) {
      redirect("/")
    }
  }, [isSuccess])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className} {...props}>
      <div className=" flex flex-col space-y-8 py-8">
        <h1 className="text-center text-2xl font-bold tracking-tighter">Welcome back</h1>
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
          <div className="flex flex-col">
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password")}
            />
            {errors?.password && (
              <p className="pt-2 text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>
        </div>
        <Button variant="primary" disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>
      </div>
    </form>
  )
}
