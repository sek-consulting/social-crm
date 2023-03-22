import * as React from "react"

import { cn } from "~/lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={cn("rounded-lg bg-white p-5 shadow", className)} ref={ref} {...props}>
        {children}
      </div>
    )
  }
)
Card.displayName = "Card"

export { Card }
