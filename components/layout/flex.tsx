import * as React from "react"

import { cn } from "~/lib/utils"

// https://css-tricks.com/snippets/css/a-guide-to-flexbox/
export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  flexDirection?: "row" | "col" | "row-reverse" | "col-reverse"
  justifyContent?: "start" | "end" | "center" | "between" | "around" | "evenly"
  alignItems?: "start" | "end" | "center" | "baseline" | "stretch"
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      flexDirection = "row",
      justifyContent = "start",
      alignItems = "stretch",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          "flex-" + flexDirection,
          "justify-" + justifyContent,
          "items-" + alignItems,
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Flex.displayName = "Flex"

export { Flex }
