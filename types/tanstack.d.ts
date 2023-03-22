import { RankingInfo } from "@tanstack/match-sorter-utils"

declare module "@tanstack/table-core" {
  interface FilterMeta {
    itemRank: RankingInfo
  }
}
