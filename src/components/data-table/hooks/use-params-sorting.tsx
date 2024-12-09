import { createMemo } from "solid-js"

import type { OnChangeFn, SortingState } from "@tanstack/solid-table"

//https://github.com/taro-28/tanstack-table-search-params

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

// const sorting = createMemo(() =>
//     parse(searchParams.sortBy)
//   )

//   const setSorting: OnChangeFn<SortingState> = (updater) => {
//     const newSorting = typeof updater === "function" ? updater(sorting()) : updater
//     setSearchParams({
//       sortBy: stringify(newSorting)
//     })
//   }
