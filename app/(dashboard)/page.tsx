import { ItemTable, type Item } from "~/components/item-table"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader } from "~/components/ui/card"
import { getCurrentUser } from "~/lib/session"

export default async function IndexPage() {
  // user can only be received in async server components
  const user = await getCurrentUser()

  const dummyData = () => {
    const items: Item[] = []
    for (let i = 0; i < 20; i++) {
      items.push({
        name: `Super duper long item name ${i}`,
        price: 10 * i,
        quantity: 20 - i
      })
    }
    return items
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Card className="p-4">HELLO {user?.name}!</Card>
        <Card className="w-64">
          <CardHeader>
            <div className="flex justify-between">
              <p>Sales</p>
              <Badge variant={"default"}>+15 %</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold">$ 23,456</span>
          </CardContent>
        </Card>
        <Card className="flex space-x-2 p-4">
          <Button>default</Button>
          <Button variant="secondary">secondary</Button>
          <Button variant="ghost">ghost</Button>
          <Button variant="destructive">destructive</Button>
          <Button variant="outline">outline</Button>
          <Button variant="link">link</Button>
        </Card>
        <Card className="p-4">
          <ItemTable data={dummyData()} />
        </Card>
      </div>
    </div>
  )
}
