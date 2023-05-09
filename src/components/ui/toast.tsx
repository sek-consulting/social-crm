import type { Component } from "solid-js"
import { splitProps } from "solid-js"

import { Toast as ToastPrimitive } from "@kobalte/core"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import { Portal } from "solid-js/web"

import { Close } from "../icons"
import { cn } from "~/lib/utils"

const toastVariants = cva(
  "data-[swipe=move]:transition-none group relative pointer-events-auto flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=move]:translate-x-[var(--kb-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--kb-toast-swipe-end-x)] data-[opened]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[opened]:slide-in-from-top-full data-[opened]:sm:slide-in-from-bottom-full data-[state=closed]:slide-out-to-right-full",
  {
    variants: {
      variant: {
        default: "bg-background border",
        destructive:
          "group destructive border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export interface ToastProps
  extends ToastPrimitive.ToastRootProps,
    VariantProps<typeof toastVariants> {}

const Toast: Component<ToastProps> = (props) => {
  const [, rest] = splitProps(props, ["class", "variant", "children"])
  return (
    <ToastPrimitive.Root
      class={cn(toastVariants({ variant: props.variant }), props.class)}
      {...rest}
    >
      {props.children}
    </ToastPrimitive.Root>
  )
}

const ToastClose: typeof ToastPrimitive.CloseButton = (props) => {
  const [, rest] = splitProps(props, ["class"])
  return (
    <ToastPrimitive.CloseButton
      class={cn(
        "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
        props.class
      )}
      {...rest}
    >
      <Close class="h-4 w-4" />
    </ToastPrimitive.CloseButton>
  )
}

const ToastTitle: typeof ToastPrimitive.Title = (props) => {
  const [, rest] = splitProps(props, ["class"])
  return <ToastPrimitive.Title class={cn("text-sm font-semibold", props.class)} {...rest} />
}

const ToastDescription: typeof ToastPrimitive.Description = (props) => {
  const [, rest] = splitProps(props, ["class"])
  return <ToastPrimitive.Description class={cn("text-sm opacity-90", props.class)} {...rest} />
}

const ToastProvider: typeof ToastPrimitive.Region = (props) => {
  const [, rest] = splitProps(props, ["class"])
  return (
    <Portal>
      <ToastPrimitive.Region
        class={cn(
          "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
          props.class
        )}
        {...rest}
      >
        <ToastPrimitive.List class="grid gap-1" />
      </ToastPrimitive.Region>
    </Portal>
  )
}

export { Toast, ToastTitle, ToastDescription, ToastClose, ToastProvider }
