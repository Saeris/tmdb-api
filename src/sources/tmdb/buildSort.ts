export interface SortBy<T = string> {
  sortBy?: {
    by?: T
    direction?: "ASC" | "DESC"
  }
}

export type DiscoverMoviesSortBy =
  | "Popularity"
  | "ReleaseDate"
  | "Revenue"
  | "PrimaryReleaseDate"
  | "OriginalTitle"
  | "VoteAverage"
  | "VoteCount"

export type DiscoverTVSortBy = "Popularity" | "FirstAirDate" | "VoteAverage"

type BuildSort = (config?: SortBy["sortBy"]) => { [key: string]: string }

export const buildSort: BuildSort = (sortBy = {}) => {
  const param: { [key: string]: string } = {}
  if (sortBy.by && sortBy.direction) {
    param.sort_by = `${sortBy.by}.${sortBy.direction}`
  }
  return param
}
