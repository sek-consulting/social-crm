import { splitProps } from "solid-js"

import { Select as SelectPrimitive } from "@kobalte/core"

import { Check, ChevronDown } from "~/components/icons"
import { cn } from "~/lib/utils"

const Select = SelectPrimitive.Root

const SelectValue = SelectPrimitive.Value

const SelectTrigger: typeof SelectPrimitive.Trigger = (props) => {
  const [, rest] = splitProps(props, ["class", "children"])
  return (
    <SelectPrimitive.Trigger
      class={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        props.class
      )}
      {...rest}
    >
      {props.children}
      <SelectPrimitive.Icon>
        <ChevronDown class="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

const SelectContent: typeof SelectPrimitive.Content = (props) => {
  const [, rest] = splitProps(props, ["class"])
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        class={cn(
          "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
          props.class
        )}
        {...rest}
      >
        <SelectPrimitive.Listbox class="p-1" />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

const SelectItem: typeof SelectPrimitive.Item = (props) => {
  const [, rest] = splitProps(props, ["class", "children"])
  return (
    <SelectPrimitive.Item
      class={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        props.class
      )}
      {...rest}
    >
      <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check class="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemLabel>{props.children}</SelectPrimitive.ItemLabel>
    </SelectPrimitive.Item>
  )
}

export { Select, SelectValue, SelectTrigger, SelectContent, SelectItem }

/*
// EXAMPLE

const [value, setValue] = createSignal("")
  return (
    <main class="flex min-h-screen flex-col items-center justify-center">
      <Select
        value={value()}
        onChange={setValue}
        options={["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"]}
        placeholder="Select a fruit…"
        itemComponent={(props) => <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>}
      >
        <SelectTrigger aria-label="Fruit" class="w-[180px]">
          <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
        </SelectTrigger>
        <SelectContent />
      </Select>
      <p class="pt-2 text-sm text-gray-500">Your favorite fruit is: {value()}</p>
    </main>
  )
*/
