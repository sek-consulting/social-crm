import { type ParentProps } from "solid-js"

import { IconLogo } from "~/components/icons"

const QUOTES = [
  {
    text: "If we want users to like our software, we should design it to behave like a likeable person.",
    author: "Alan Cooper"
  },
  {
    text: "Software and cathedrals are much the same — first we build them, then we pray.",
    author: "Anonymous"
  },
  {
    text: "The most dangerous phrase in the language is, 'We've always done it this way.'",
    author: "Grace Hopper"
  },
  {
    text: "The function of good software is to make the complex appear to be simple.",
    author: "Grady Booch"
  }
]

export default function AuthLayout(props: ParentProps) {
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)]

  return (
    <div class="grid h-screen lg:grid-cols-2">
      <div class="hidden size-full flex-col justify-between border-r border-sidebar-border bg-sidebar p-12 text-sidebar-foreground lg:flex">
        <div class="flex items-center font-bold">
          <IconLogo class="mr-2 size-6" /> SOCIAL CRM
        </div>
        <blockquote class="border-l-2 pl-6 italic">
          “{quote.text}” ~{quote.author}
        </blockquote>
      </div>
      <main class="flex items-center justify-center p-4">{props.children}</main>
    </div>
  )
}
