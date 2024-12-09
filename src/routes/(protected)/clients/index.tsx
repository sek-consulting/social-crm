import { createEffect, createMemo, createSignal, For, Match, Show, Switch } from "solid-js"
import { useSearchParams } from "@solidjs/router"

import type {
  ColumnDef,
  ColumnFiltersState,
  OnChangeFn,
  SortingState,
  VisibilityState
} from "@tanstack/solid-table"
import {
  createSolidTable,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from "@tanstack/solid-table"

import {
  TableColumnHeader,
  TableFacetedFilter,
  TableInputFilter,
  TablePagination,
  TableViewOptions
} from "~/components/data-table"
import { Badge } from "~/components/ui/badge"
import { Checkbox } from "~/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "~/components/ui/table"

export type Task = {
  id: string
  code: string
  title: string
  status: "todo" | "in-progress" | "done" | "cancelled"
  label: "bug" | "feature" | "enhancement" | "documentation"
}

const filteredStatusList = () =>
  ["todo", "in-progress", "done", "cancelled"].map((e) => ({
    label: e,
    value: e
  }))

const columns: ColumnDef<Task>[] = [
  {
    id: "selects",
    header: (props) => (
      <Checkbox
        indeterminate={props.table.getIsSomePageRowsSelected()}
        checked={props.table.getIsAllPageRowsSelected()}
        onChange={(value) => props.table.toggleAllPageRowsSelected(value)}
        aria-label="Select all"
      />
    ),
    cell: (props) => (
      <Checkbox
        checked={props.row.getIsSelected()}
        onChange={(value) => props.row.toggleSelected(value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "code",
    header: (props) => <TableColumnHeader column={props.column} title="Code" />,
    cell: (props) => <div class="w-[70px]">{props.row.getValue("code")}</div>,
    enableSorting: true,
    enableHiding: false
  },
  {
    accessorKey: "title",
    header: (props) => <TableColumnHeader column={props.column} title="Title" />,
    cell: (props) => (
      <div class="flex space-x-2">
        <Badge variant="outline">{props.row.original.label}</Badge>
        <span class="max-w-[250px] truncate font-medium">{props.row.getValue("title")}</span>
      </div>
    )
  },
  {
    accessorKey: "status",
    cell: (props) => (
      <div class="flex w-[120px] items-center">
        <Switch>
          <Match when={props.row.original.status === "cancelled"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              class="mr-2 size-4 text-muted-foreground"
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 20.777a8.942 8.942 0 0 1-2.48-.969M14 3.223a9.003 9.003 0 0 1 0 17.554m-9.421-3.684a8.961 8.961 0 0 1-1.227-2.592M3.124 10.5c.16-.95.468-1.85.9-2.675l.169-.305m2.714-2.941A8.954 8.954 0 0 1 10 3.223M14 14l-4-4m0 4l4-4"
              />
            </svg>
          </Match>
          <Match when={props.row.original.status === "done"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              class="mr-2 size-4 text-muted-foreground"
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path d="M10 20.777a8.942 8.942 0 0 1-2.48-.969M14 3.223a9.003 9.003 0 0 1 0 17.554m-9.421-3.684a8.961 8.961 0 0 1-1.227-2.592M3.124 10.5c.16-.95.468-1.85.9-2.675l.169-.305m2.714-2.941A8.954 8.954 0 0 1 10 3.223" />
                <path d="m9 12l2 2l4-4" />
              </g>
            </svg>
          </Match>
          <Match when={props.row.original.status === "in-progress"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              class="mr-2 size-4 text-muted-foreground"
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 20.777a8.942 8.942 0 0 1-2.48-.969M14 3.223a9.003 9.003 0 0 1 0 17.554m-9.421-3.684a8.961 8.961 0 0 1-1.227-2.592M3.124 10.5c.16-.95.468-1.85.9-2.675l.169-.305m2.714-2.941A8.954 8.954 0 0 1 10 3.223M12 9l-2 3h4l-2 3"
              />
            </svg>
          </Match>
          <Match when={props.row.original.status === "todo"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              class="mr-2 size-4 text-muted-foreground"
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path d="M12 16v.01M12 13a2 2 0 0 0 .914-3.782a1.98 1.98 0 0 0-2.414.483M10 20.777a8.942 8.942 0 0 1-2.48-.969" />
                <path d="M14 3.223a9.003 9.003 0 0 1 0 17.554m-9.421-3.684a8.961 8.961 0 0 1-1.227-2.592M3.124 10.5c.16-.95.468-1.85.9-2.675l.169-.305m2.714-2.941A8.954 8.954 0 0 1 10 3.223" />
              </g>
            </svg>
          </Match>
        </Switch>
        <span class="capitalize">{props.row.original.status}</span>
      </div>
    ),
    filterFn: (row, id, value) => {
      return Array.isArray(value) && value.includes(row.getValue(id))
    }
  }
]

type SearchParams = {
  sortBy: string
}

export default function Clients() {
  const data = createMemo(() => dataTable)
  const [rowSelection, setRowSelection] = createSignal({})
  const [columnVisibility, setColumnVisibility] = createSignal<VisibilityState>({})
  const [columnFilters, setColumnFilters] = createSignal<ColumnFiltersState>([])
  // const [_sorting, _setSorting] = createSignal<SortingState>([])
  // createEffect(() => console.log(_sorting()))

  const [searchParams, setSearchParams] = useSearchParams<SearchParams>()
  createEffect(() => console.log(searchParams.sortBy))

  const stringify = (sorting: SortingState) => {
    console.log(sorting)
    return sorting.map((item) => `${item.id}.${item.desc ? "desc" : "asc"}`).join(";")
  }

  const parse = (str: string | undefined): SortingState => {
    if (!str) return []
    return str.split(";").map((item) => {
      const [id, direction] = item.split(".")
      return { id, desc: direction === "desc" }
    })
  }

  const sorting = createMemo(() =>
    // try {
    //   return JSON.parse(searchParams.sortBy ?? "[]")
    // } catch {
    //   return []
    // }
    parse(searchParams.sortBy)
  )
  const setSorting: OnChangeFn<SortingState> = (updater) => {
    const newSorting = typeof updater === "function" ? updater(sorting()) : updater
    setSearchParams({
      //sortBy: JSON.stringify(newSorting)
      sortBy: stringify(newSorting)
    })

    // [{"id":"title","desc":false}]
    /*
    export interface ColumnSort {
      desc: boolean;
      id: string;
    }
    export type SortingState = ColumnSort[];
    */
  }

  const table = createSolidTable({
    get data() {
      return data()
    },
    columns,
    state: {
      get sorting() {
        return sorting()
      },
      get columnVisibility() {
        return columnVisibility()
      },
      get rowSelection() {
        return rowSelection()
      },
      get columnFilters() {
        return columnFilters()
      }
    },
    enableRowSelection: true,
    enableMultiSort: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  })

  return (
    <div class="w-full space-y-2.5">
      <div class="flex items-center justify-between gap-2">
        <TableInputFilter
          placeholder="Filter titles..."
          class="h-8"
          column={table.getColumn("title")}
        />
        <div class="flex items-center gap-2">
          <TableFacetedFilter
            column={table.getColumn("status")}
            options={filteredStatusList()}
            title="Status"
          />
          <TableViewOptions table={table} />
        </div>
      </div>
      <div class="rounded-md border">
        <Table>
          <TableHeader>
            <For each={table.getHeaderGroups()}>
              {(headerGroup) => (
                <TableRow>
                  <For each={headerGroup.headers}>
                    {(header) => {
                      return (
                        <TableHead>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      )
                    }}
                  </For>
                </TableRow>
              )}
            </For>
          </TableHeader>
          <TableBody>
            <Show
              when={table.getRowModel().rows?.length}
              fallback={
                <TableRow>
                  <TableCell colSpan={columns.length} class="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              }
            >
              <For each={table.getRowModel().rows}>
                {(row) => (
                  <TableRow data-state={row.getIsSelected() && "selected"}>
                    <For each={row.getVisibleCells()}>
                      {(cell) => (
                        <TableCell>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      )}
                    </For>
                  </TableRow>
                )}
              </For>
            </Show>
          </TableBody>
        </Table>
      </div>
      <TablePagination table={table} />
    </div>
  )
}

const dataTable: Task[] = [
  {
    id: "5Cv_HJphd7Ct8vmUMbOoA",
    code: "TASK-70",
    title: "I'll generate the digital ADP program, that should matrix the CSS panel!",
    status: "in-progress",
    label: "feature"
  },
  {
    id: "STlHGZ5ZZI3C6qw5FRWLb",
    code: "TASK-79",
    title: "We need to index the neural RSS microchip!",
    status: "done",
    label: "enhancement"
  },
  {
    id: "kKRNaR83olEfqlo87ydSS",
    code: "TASK-46",
    title: "Use the 1080p IP bus, then you can reboot the haptic firewall!",
    status: "in-progress",
    label: "feature"
  },
  {
    id: "8RJXWg_xsCz4icZwAFtX9",
    code: "TASK-72",
    title: "Calculating the array won't do anything, we need to program the neural UTF8 sensor!",
    status: "done",
    label: "feature"
  },
  {
    id: "PA2XaWzlfR_rHYGjtvIm1",
    code: "TASK-91",
    title: "Hacking the pixel won't do anything, we need to index the wireless SDD hard drive!",
    status: "cancelled",
    label: "feature"
  },
  {
    id: "SCEhEoXDIYuOeEUh8RJ9K",
    code: "TASK-51",
    title:
      "The SSD port is down, generate the solid state transmitter so we can synthesize the JBOD program!",
    status: "in-progress",
    label: "enhancement"
  },
  {
    id: "HTx-1cFXRS7wUJgH5SspB",
    code: "TASK-92",
    title: "You can't parse the array without copying the neural AI matrix!",
    status: "todo",
    label: "documentation"
  },
  {
    id: "IbWbOByfnFdV18G-dqL2n",
    code: "TASK-55",
    title:
      "The AGP capacitor is down, input the online program so we can index the HTTP microchip!",
    status: "todo",
    label: "enhancement"
  },
  {
    id: "qlbOOhg8XQciSiPaz5By_",
    code: "TASK-91",
    title: "You can't quantify the microchip without transmitting the redundant IB alarm!",
    status: "in-progress",
    label: "feature"
  },
  {
    id: "X5TrXjyqsNfhoDLksl7uU",
    code: "TASK-15",
    title: "Use the primary XML sensor, then you can hack the optical card!",
    status: "in-progress",
    label: "documentation"
  },
  {
    id: "uunTga73xvp65mLxEuHia",
    code: "TASK-18",
    title: "Use the solid state UTF8 microchip, then you can compress the multi-byte capacitor!",
    status: "in-progress",
    label: "documentation"
  },
  {
    id: "K96w-mLNT9sQTN5UFck81",
    code: "TASK-76",
    title:
      "The THX circuit is down, compress the neural system so we can synthesize the TLS bandwidth!",
    status: "done",
    label: "enhancement"
  },
  {
    id: "iuCChR41hAw6udpKQ1Lgg",
    code: "TASK-09",
    title: "Use the neural AGP monitor, then you can parse the back-end feed!",
    status: "done",
    label: "bug"
  },
  {
    id: "4ExQrW1EjDfVcwT0QYwiZ",
    code: "TASK-29",
    title: "We need to index the optical FTP program!",
    status: "cancelled",
    label: "documentation"
  },
  {
    id: "kbbZfOSJFKDCDr8avk38l",
    code: "TASK-55",
    title: "You can't hack the array without hacking the cross-platform IB monitor!",
    status: "done",
    label: "bug"
  },
  {
    id: "nBqIFZfQRFWXriKgFHAZf",
    code: "TASK-76",
    title: "I'll bypass the back-end COM microchip, that should alarm the RSS interface!",
    status: "todo",
    label: "documentation"
  },
  {
    id: "VvJ--sJZRH_vLcS6jBBBl",
    code: "TASK-10",
    title: "Parsing the array won't do anything, we need to compress the neural IP card!",
    status: "in-progress",
    label: "enhancement"
  },
  {
    id: "TQsQy5ppTGFX0Lh9Tp2PY",
    code: "TASK-74",
    title: "Use the cross-platform SSL microchip, then you can index the open-source array!",
    status: "cancelled",
    label: "enhancement"
  },
  {
    id: "7utf3KwU2_SHVA_RKgDUM",
    code: "TASK-27",
    title: "I'll program the open-source SQL feed, that should interface the UTF8 protocol!",
    status: "cancelled",
    label: "documentation"
  },
  {
    id: "sn3m5uAQvNWlU5MNQSmvi",
    code: "TASK-21",
    title:
      "Transmitting the feed won't do anything, we need to synthesize the digital VGA transmitter!",
    status: "done",
    label: "documentation"
  }
]
