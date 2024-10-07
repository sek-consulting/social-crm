import { ModeToggle } from "~/components/mode-toggle"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { TextField, TextFieldInput, TextFieldLabel } from "~/components/ui/text-field"

export default function Home() {
  return (
    <main class="flex h-screen items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Hello World!</CardTitle>
        </CardHeader>
        <CardContent class="flex flex-col gap-4">
          <TextField>
            <TextFieldLabel>E-Mail</TextFieldLabel>
            <TextFieldInput type="text" />
          </TextField>
          <Button>Send!</Button>
          <ModeToggle />
        </CardContent>
      </Card>
    </main>
  )
}
