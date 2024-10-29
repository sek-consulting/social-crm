import { createSignal, Show } from "solid-js"

import { A, action, redirect, useSubmission } from "@solidjs/router"
import { eq } from "drizzle-orm"

import { IconBrandGoogle, IconEye, IconEyeOff } from "~/components/icons"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { TextField, TextFieldInput, TextFieldLabel } from "~/components/ui/text-field"
import { db, takeFirst, userTable } from "~/lib/db"

export default function Login() {
  const [hidden, setHidden] = createSignal(true)
  const submission = useSubmission(login)

  return (
    <div class="flex min-h-screen flex-col items-center justify-center">
      <Card class="w-full rounded-none md:w-96 md:rounded-lg">
        <CardHeader>
          <CardTitle class="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent class="flex flex-col gap-6">
          <form class="flex flex-col gap-2" method="post" action={login}>
            <TextField>
              <TextFieldLabel>Email</TextFieldLabel>
              <TextFieldInput
                id="email"
                type="email"
                name="email"
                autocomplete="username"
                required
              />
            </TextField>
            <TextField>
              <TextFieldLabel>Password</TextFieldLabel>
              <div class="relative">
                <TextFieldInput
                  id="password"
                  type={hidden() ? "password" : "text"}
                  name="password"
                  autocomplete="current-password"
                  required
                />
                <Button
                  variant="ghost"
                  class="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setHidden((b) => !b)}
                >
                  <Show when={hidden()} fallback={<IconEyeOff />}>
                    <IconEye />
                  </Show>
                </Button>
              </div>
            </TextField>
            <A href="" class="text-right text-sm underline">
              Forgot password?
            </A>
            <Button type="submit">Login</Button>
            <Show when={submission.result}>{(result) => <p>{result().message}</p>}</Show>
          </form>
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t" />
            </div>
            <div class="relative flex justify-center">
              <span class="bg-background px-2 text-xs uppercase text-muted-foreground">
                or continue with
              </span>
            </div>
          </div>
          <Button variant="outline" class="w-full">
            <IconBrandGoogle class="mr-2" /> Google
          </Button>
          <div class="text-center text-sm">
            Don&apos;t have an account?{" "}
            <A href="#" class="underline">
              Sign up
            </A>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const login = action(async (formData: FormData) => {
  "use server"

  console.log("hello from the server")

  const email = formData.get("email")
  if (typeof email !== "string" || email.length >= 256 || !/^.+@.+\..+$/.test(email)) {
    return new Error("Invalid email")
  }

  const password = formData.get("password")
  if (typeof password !== "string" || password === "") {
    return new Error("Invalid password")
  }

  console.log(email, password)

  const existingUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email))
    .then(takeFirst)

  console.log("after select")

  if (!existingUser) {
    return new Error("Incorrect username or password")
  }

  throw redirect("/")
})
