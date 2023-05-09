import { splitProps } from "solid-js"
import { A } from "solid-start"

import { buttonVariants } from "~/components/ui/button"
import { cn } from "~/lib/utils"

const Link: typeof A = (props) => {
  const [, rest] = splitProps(props, ["class"])
  return <A class={cn(buttonVariants({ variant: "link" }), props.class)} {...rest} />
}

export { Link }
