import type { Logic } from "./types"

export interface KeywordInput {
  include: string[]
  includeLogic: Logic
  exclude: string[]
  excludeLogic: Logic
}

export const buildKeywordFilter = (
  field: string,
  keywordFilter?: KeywordInput
) => {
  const filter: { [key: string]: string } = {}
  if (keywordFilter) {
    if (keywordFilter.include) {
      filter[`with_${field}`] = keywordFilter.include.join(
        keywordFilter.includeLogic
      )
    }
    if (keywordFilter.exclude) {
      filter[`without_${field}`] = keywordFilter.exclude.join(
        keywordFilter.excludeLogic
      )
    }
  }
  return filter
}
