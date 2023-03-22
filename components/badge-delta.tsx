import { Icons } from "~/components/icons"
import { Badge, badgeVariants } from "~/components/ui/badge"
import { cn } from "~/lib/utils"

export type DeltaType =
  | "increase"
  | "moderateIncrease"
  | "unchanged"
  | "moderateDecrease"
  | "decrease"

const deltaIcons: { [key in DeltaType]: React.ElementType } = {
  increase: Icons.arrowUp,
  moderateIncrease: Icons.arrowUpRight,
  unchanged: Icons.arrowRight,
  moderateDecrease: Icons.arrowDownRight,
  decrease: Icons.arrowDown
}

interface BadgeDeltaProps extends React.HTMLAttributes<HTMLSpanElement> {
  deltaType: DeltaType
  isIncreasePositive?: boolean
}

export function BadgeDelta({
  className,
  deltaType,
  isIncreasePositive = true,
  children,
  ...props
}: BadgeDeltaProps) {
  // TODO: fix this please!
  let colorScheme = badgeVariants({ variant: "orange" })
  switch (deltaType) {
    case "increase":
    case "moderateIncrease":
      colorScheme = badgeVariants({ variant: isIncreasePositive ? "green" : "red" })
      break
    case "moderateDecrease":
    case "decrease":
      colorScheme = badgeVariants({ variant: isIncreasePositive ? "red" : "green" })
      break
  }

  return (
    <Badge icon={deltaIcons[deltaType]} className={cn(colorScheme, className)} {...props}>
      {children}
    </Badge>
  )
}
