import { ModeToggle } from "~/components/mode-toggle"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Callout, CalloutContent, CalloutTitle } from "~/components/ui/callout"

export default function Home() {
  return (
    <div class="flex h-screen items-center justify-center">
      <div class="flex w-[600px] flex-col gap-2">
        <Callout>
          <CalloutTitle>Default</CalloutTitle>
          <CalloutContent>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora cupiditate sapiente
            officiis ullam, nulla nam sunt? Ipsa facilis ut aspernatur debitis. Qui dolorem modi,
            assumenda nihil eligendi commodi tempore eos?
          </CalloutContent>
        </Callout>
        <Callout variant={"success"}>
          <CalloutTitle>Success</CalloutTitle>
          <CalloutContent>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora cupiditate sapiente
            officiis ullam, nulla nam sunt? Ipsa facilis ut aspernatur debitis. Qui dolorem modi,
            assumenda nihil eligendi commodi tempore eos?
          </CalloutContent>
        </Callout>
        <Callout variant={"warning"}>
          <CalloutTitle>Warning</CalloutTitle>
          <CalloutContent>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora cupiditate sapiente
            officiis ullam, nulla nam sunt? Ipsa facilis ut aspernatur debitis. Qui dolorem modi,
            assumenda nihil eligendi commodi tempore eos?
          </CalloutContent>
        </Callout>
        <Callout variant={"error"}>
          <CalloutTitle>Error</CalloutTitle>
          <CalloutContent>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora cupiditate sapiente
            officiis ullam, nulla nam sunt? Ipsa facilis ut aspernatur debitis. Qui dolorem modi,
            assumenda nihil eligendi commodi tempore eos?
          </CalloutContent>
        </Callout>
        <div class="flex gap-2">
          <Badge>default</Badge>
          <Badge variant="secondary">secondary</Badge>
          <Badge variant="outline">outline</Badge>
          <Badge variant="info">info</Badge>
          <Badge variant="success">success</Badge>
          <Badge variant="warning">warning</Badge>
          <Badge variant="error">error</Badge>
        </div>
        <div class="flex gap-2">
          <Button>TEST</Button>
          <Button variant={"destructive"}>TEST</Button>
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}
