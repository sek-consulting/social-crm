import type { JSX } from "solid-js"
import { splitProps } from "solid-js"

import { toaster } from "@kobalte/core"

import type { ToastProps } from "~/components/ui/toast"
import { Toast, ToastClose, ToastDescription, ToastTitle } from "~/components/ui/toast"

export function showToast(
  toastProps: ToastProps & {
    title?: JSX.Element
    description?: JSX.Element
  }
) {
  const [, rest] = splitProps(toastProps, ["title", "description"])
  toaster.show((props) => (
    <Toast {...rest} toastId={props.toastId}>
      <div>
        {toastProps.title && <ToastTitle>{toastProps.title}</ToastTitle>}
        {toastProps.description && <ToastDescription>{toastProps.description}</ToastDescription>}
        <ToastClose />
      </div>
    </Toast>
  ))
}
