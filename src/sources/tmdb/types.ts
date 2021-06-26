import type { RESTDataSource } from "apollo-datasource-rest"
import type { GraphQLResolveInfo } from "graphql"
import type { Context } from "../../server"

export interface Query {
  query: string
}

export interface ByPage {
  page?: number
}

export interface ByID {
  id: string
}

export interface ByIDList {
  ids: string[]
}

export interface BySeason {
  show: string
  season: string
}

export interface ByEpisode extends BySeason {
  episode: string
}

export interface ByLanguage {
  language?: string
}

export interface Timeframe {
  timeframe: "Day" | "Week"
}

export interface RawImage {
  // eslint-disable-next-line camelcase
  file_path: string
}

export type Logic = "AND" | "OR"

export interface Filter<T> {
  filter?: T
}

type TMDB = RESTDataSource<Context>

export type Model<
  T extends keyof TMDB["context"]["models"] = keyof TMDB["context"]["models"]
> = ReturnType<TMDB["context"]["models"][T]>

export type APIRequest<
  Params = Record<any, any>,
  T = Model | { [key: string]: Model }
> = (params: Params, info: GraphQLResolveInfo | null) => Promise<T>
