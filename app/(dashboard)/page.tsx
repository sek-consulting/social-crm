import { BadgeDelta } from "~/components/badge-delta"
import { ItemTable, type Item } from "~/components/item-table"
import { Card } from "~/components/layout/card"
import { Flex } from "~/components/layout/flex"
import { Button } from "~/components/ui/button"
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
        <Card>HELLO {user?.name}!</Card>
        <Card className="w-64">
          <Flex>
            <p>Sales</p>
            <BadgeDelta deltaType="moderateIncrease">+15 %</BadgeDelta>
          </Flex>
          <span className="text-3xl font-bold">$ 23,456</span>
        </Card>
        <Card className="flex flex-row gap-2">
          <Button>default</Button>
          <Button variant="primary">primary</Button>
          <Button variant="destructive">destructive</Button>
          <Button variant="outline">outline</Button>
          <Button variant="link">link</Button>
        </Card>
        <Card>
          <ItemTable data={dummyData()} />
        </Card>
      </div>
    </div>
  )
}
