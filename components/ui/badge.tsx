import * as React from "react"

import { cva, VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const badgeVariants = cva(
  "inline-flex w-max shrink-0 cursor-default items-center justify-center rounded-full text-sm",
  {
    variants: {
      variant: {
        default: "bg-zinc-900 text-white",
        subtle: "bg-zinc-300 text-zinc-900",
        green: "bg-emerald-100 text-emerald-700",
        orange: "bg-orange-100 text-orange-700",
        red: "bg-rose-100 text-rose-700"
      },
      size: {
        xs: "px-2 py-0.5",
        sm: "px-2.5 py-0.5",
        md: "px-3 py-0.5",
        lg: "px-3.5 py-0.5",
        xl: "px-4 py-1"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "sm"
    }
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ElementType
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, icon, children, ...props }, ref) => {
    const Icon = icon
    return (
      <span className={cn(badgeVariants({ variant, size, className }))} ref={ref} {...props}>
        {Icon ? <Icon className="mr-1 h-4 w-4" /> : null}
        {children}
      </span>
    )
  }
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
