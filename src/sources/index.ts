import type { DataSources } from "apollo-server-core/dist/graphqlOptions"
import type { Context } from "../server"
import { Images } from "./images"
import { TMDB } from "./tmdb"

export type {
  Query,
  ByID,
  ByIDList,
  ByPage,
  ByLanguage,
  Timeframe,
  Filter,
  SortBy,
  DiscoverMoviesFilter,
  DiscoverTVFilter,
  DiscoverMoviesSortBy,
  DiscoverTVSortBy
} from "./tmdb"

export interface Sources extends DataSources<Context> {
  Images: Images
  TMDB: TMDB
}

export const dataSources = (): Sources => ({
  Images: new Images(),
  TMDB: new TMDB()
})
