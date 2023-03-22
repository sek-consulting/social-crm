import * as React from "react"

import { VariantProps, cva } from "class-variance-authority"

import { cn } from "~/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-zinc-100",
  {
    variants: {
      variant: {
        default: "dark:hover:bg-Zinc-700 bg-zinc-900 text-white hover:bg-zinc-700",
        primary: "bg-teal-500 text-white hover:bg-teal-600",
        destructive: "bg-crimson-500 text-white hover:bg-crimson-600",
        outline: "border border-zinc-200 bg-transparent hover:bg-zinc-100",
        link: "bg-transparent text-zinc-900 underline-offset-4 hover:bg-transparent hover:underline"
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-8 rounded-md px-2",
        lg: "h-12 rounded-md px-8"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
