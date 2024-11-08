import { Show } from "solid-js"
import { A, useAction, useSubmission } from "@solidjs/router"

import type { SubmitHandler } from "@modular-forms/solid"
import { createForm, FormError, valiForm } from "@modular-forms/solid"
import * as v from "valibot"

import { IconBrandGoogle, IconLoader } from "~/components/icons"
import { PasswordInput } from "~/components/password-input"
import { Button } from "~/components/ui/button"
import {
  TextField,
  TextFieldErrorMessage,
  TextFieldInput,
  TextFieldLabel
} from "~/components/ui/text-field"
import { login as loginAction } from "~/lib/auth"

const LoginSchema = v.object({
  email: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your email."),
    v.email("The email address is badly formatted.")
  ),
  password: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your password."),
    v.minLength(8, "Your password must have 8 characters or more."),
    v.maxLength(255, "Your password cant't have more than 255 characters.")
  )
})
type LoginForm = v.InferInput<typeof LoginSchema>

export default function Login() {
  const login = useAction(loginAction)
  const submission = useSubmission(loginAction)

  const [loginForm, { Form, Field }] = createForm<LoginForm>({
    validate: valiForm(LoginSchema)
  })

  const handleSubmit: SubmitHandler<LoginForm> = async (values) => {
    console.log("handlesubmit")
    await login(values)
    if (submission.result) {
      throw new FormError<LoginForm>({ email: submission.result.message })
    }
    console.log("done")
  }

  return (
    <div class="flex w-full flex-col justify-center gap-6 sm:max-w-sm">
      <div class="flex flex-col gap-2">
        <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Welcome Back!</h3>
        <p class="text-sm text-muted-foreground">Enter your email below to log into your account</p>
      </div>
      <Form class="flex flex-col gap-2" onSubmit={handleSubmit}>
        <Field name="email">
          {(field, props) => (
            <TextField validationState={field.error ? "invalid" : "valid"}>
              <TextFieldLabel>Email</TextFieldLabel>
              <TextFieldInput {...props} type="email" autocomplete="username" required />
              <TextFieldErrorMessage>{field.error}</TextFieldErrorMessage>
            </TextField>
          )}
        </Field>
        <Field name="password">
          {(field, props) => (
            <TextField validationState={field.error ? "invalid" : "valid"}>
              <TextFieldLabel>Password</TextFieldLabel>
              <PasswordInput {...props} autocomplete="current-password" required />
              <TextFieldErrorMessage>{field.error}</TextFieldErrorMessage>
            </TextField>
          )}
        </Field>
        <A href="" class="text-right text-sm underline">
          Forgot password?
        </A>
        <Button class="mt-2" disabled={loginForm.submitting} type="submit">
          <Show when={loginForm.submitting}>
            <IconLoader class="mr-2 animate-spin" />
          </Show>
          Login
        </Button>
      </Form>
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
      <Button variant="outline">
        <IconBrandGoogle class="mr-2" /> Google
      </Button>
      <div class="text-center text-sm">
        Don&apos;t have an account?{" "}
        <A href="#" class="underline">
          Register Now
        </A>
      </div>
    </div>
  )
}
