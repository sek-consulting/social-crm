"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { Badge } from "~/components/ui/badge"
import { Table } from "~/components/ui/table"

export type Item = {
  name: String
  price: number
  quantity: number
}

interface TableProps {
  data: Item[]
}

export function ItemTable({ data }: TableProps) {
  const columnHelper = createColumnHelper<Item>()
  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor("price", {
      cell: (info) =>
        info.getValue() > 70 ? (
          <Badge variant="red">{info.getValue()}</Badge>
        ) : info.getValue() < 30 ? (
          <Badge variant="green">{info.getValue()}</Badge>
        ) : (
          <Badge variant="subtle">{info.getValue()}</Badge>
        )
    })
  ]

  return <Table data={data} columns={columns} />
}
