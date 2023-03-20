"use client"

import * as React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { redirect, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { toast } from "~/hooks/use-toast"
import { cn } from "~/lib/utils"
import { userAuthSchema } from "~/lib/validation/auth"

import { Icons } from "./icons"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

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

    const signInReturn = await signIn("credentials", {
      email: data.email.toLowerCase(),
      password: data.password,
      redirect: false,
      callbackUrl: searchParams?.get("from") || "/"
    })
    setIsLoading(false)

    if (!signInReturn?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col space-y-8 py-8", className)}
      {...props}
    >
      <h1 className="text-center text-2xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-100">
        Welcome back
      </h1>
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
    </form>
  )
}
