import { splitProps } from "solid-js"

import { Tabs as TabsPrimitive } from "@kobalte/core"

import { cn } from "~/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList: typeof TabsPrimitive.List = (props) => {
  const [, rest] = splitProps(props, ["class"])
  return (
    <TabsPrimitive.List
      class={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        props.class
      )}
      {...rest}
    />
  )
}

const TabsTrigger: typeof TabsPrimitive.Trigger = (props) => {
  const [, rest] = splitProps(props, ["class"])
  return (
    <TabsPrimitive.Trigger
      class={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[selected]:bg-background data-[selected]:text-foreground data-[selected]:shadow-sm",
        props.class
      )}
      {...rest}
    />
  )
}

const TabsContent: typeof TabsPrimitive.Content = (props) => {
  const [, rest] = splitProps(props, ["class"])
  return (
    <TabsPrimitive.Content
      class={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        props.class
      )}
      {...rest}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
