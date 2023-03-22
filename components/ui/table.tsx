"use client"

import * as React from "react"

import { rankItem } from "@tanstack/match-sorter-utils"
import {
  type ColumnDef,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from "@tanstack/react-table"

import { Icons } from "~/components/icons"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~/components/ui/select"
import { cn } from "~/lib/utils"

export interface TableProps<T extends object> extends React.HTMLAttributes<HTMLDivElement> {
  data: T[]
  columns: ColumnDef<T>[]
  showGlobalFilter?: boolean
  showFooter?: boolean
  pageSizes?: number[]
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

const Table = <T extends object>({
  data,
  columns,
  showGlobalFilter = true,
  showFooter = false,
  pageSizes = [10, 20, 30, 50],
  className,
  ...props
}: TableProps<T>) => {
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting
    },
    globalFilterFn: fuzzyFilter,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <div className="flex items-end justify-between">
        {showGlobalFilter && (
          <Input
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="w-full md:max-w-xs"
            placeholder="Search..."
          />
        )}
      </div>
      <div className="overflow-x-auto border border-zinc-300 sm:rounded-md">
        <table className="w-full text-left text-sm text-zinc-900">
          <thead className="font border-b border-zinc-300 bg-white text-xs font-medium uppercase">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-2">
                    <div
                      className={cn(
                        "flex items-center",
                        header.column.getCanSort() && "cursor-pointer select-none"
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {!header.isPlaceholder &&
                        flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: <Icons.arrowUp className="inline h-4" />,
                        desc: <Icons.arrowDown className="inline h-4" />
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, rowIdx) => (
              <tr
                key={row.id}
                className={cn("hover:bg-zinc-200", rowIdx % 2 == 0 ? "bg-zinc-50" : "bg-white")}
              >
                {row.getVisibleCells().map((cell, cellIdx) => (
                  <td className="px-3 py-1.5" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {showFooter && (
            <tfoot className="border-t border-zinc-300 bg-white text-xs font-medium uppercase dark:border-zinc-700  dark:text-gray-400">
              {table.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map((footer) => (
                    <th className="px-4 py-2" key={footer.id} colSpan={footer.colSpan}>
                      {!footer.isPlaceholder &&
                        flexRender(footer.column.columnDef.footer, footer.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
          )}
        </table>
      </div>
      <div className="flex items-center justify-between gap-2 text-sm">
        <div className="flex items-center gap-2">
          <div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="h-8 rounded-r-none"
            >
              <Icons.first className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-8 rounded-none"
            >
              <Icons.back className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-8 rounded-none"
            >
              <Icons.next className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="h-8 rounded-l-none"
            >
              <Icons.last className="h-4 w-4" />
            </Button>
          </div>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1}/{table.getPageCount()}
            </strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          Go to page:
          <Input
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="h-8 w-16"
          />
          <Select
            defaultValue={String(pageSizes[0])}
            onValueChange={(value) => {
              console.log(Number(value))
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizes.map((pageSize) => (
                <SelectItem key={pageSize} value={String(pageSize)}>
                  Show {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

export { Table }
