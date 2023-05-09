import type { Component } from "solid-js"
import { splitProps } from "solid-js"

import { Checkbox as CheckboxPrimitive } from "@kobalte/core"

import { Check } from "~/components/icons"
import { cn } from "~/lib/utils"

export interface CheckboxProps extends CheckboxPrimitive.CheckboxRootProps {
  label: string
  description?: string
  errorMessage?: string
}

const Checkbox: Component<CheckboxProps> = (props) => {
  const [, rest] = splitProps(props, ["class", "label", "description", "errorMessage"])
  return (
    <CheckboxPrimitive.Root class={cn("group flex space-x-2 items-top", props.class)} {...rest}>
      <CheckboxPrimitive.Input />
      <CheckboxPrimitive.Control class="h-4 w-4 rounded-sm border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group-data-[disabled]:cursor-not-allowed group-data-[disabled]:opacity-50 data-[checked]:border-primary">
        <CheckboxPrimitive.Indicator>
          <Check class="h-4 w-4" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Control>
      <div class="grid gap-1.5 leading-none">
        {props.label && (
          <CheckboxPrimitive.Label class="text-sm font-medium leading-none group-data-[disabled]:cursor-not-allowed group-data-[disabled]:opacity-70">
            {props.label}
          </CheckboxPrimitive.Label>
        )}
        {props.description && (
          <CheckboxPrimitive.Description class="text-sm text-muted-foreground">
            {props.description}
          </CheckboxPrimitive.Description>
        )}
        {props.errorMessage && (
          <CheckboxPrimitive.ErrorMessage class="text-sm text-destructive">
            {props.errorMessage}
          </CheckboxPrimitive.ErrorMessage>
        )}
      </div>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
