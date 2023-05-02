"use client"

import { createColumnHelper } from "@tanstack/react-table"

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
      cell: (info) => info.getValue()
    })
  ]

  return <Table data={data} columns={columns} />
}
