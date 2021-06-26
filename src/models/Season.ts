import type { Credit } from "./Credit"
import type { Episode } from "./Episode"
import { Poster } from "./Images"
import type { TV } from "./TV"
import { Video } from "./Video"
import type { Resolver } from "../resolvers/utils"
import {
  limitResults,
  filterResults,
  mapToCredits,
  mapToModel,
  createNullable
} from "../resolvers/utils"

export class Season {
  // eslint-disable-next-line no-undef
  [key: string]: any
  // eslint-disable-next-line camelcase
  media_type: string = `tv`
  id!: string

  // General Details
  series!: TV
  number: number
  name!: string
  overview!: string
  aired: Date

  // Credits
  static cast: Resolver<Season, { limit: number }, Promise<Credit[]>> = async (
    parent,
    { limit }
  ) =>
    limitResults(
      limit,
      Promise.resolve(mapToCredits(parent._credits, parent).cast)
    )

  static crew: Resolver<Season, { limit: number }, Promise<Credit[]>> = async (
    parent,
    { limit }
  ) =>
    limitResults(
      limit,
      Promise.resolve(mapToCredits(parent._credits, parent).crew)
    )

  // Episodes
  episodeCount: number
  episodes: Resolver<Season, {}, Promise<Episode[]>> = async (
    parent,
    { ...rest },
    { dataSources, language },
    info
  ) =>
    Promise.all(
      (parent._episodes as Episode[]).map(async ({ episode_number: episode }) =>
        dataSources.TMDB.episode(
          {
            show: parent.series.id,
            season: parent.season_number,
            episode,
            language,
            ...rest
          },
          info
        )
      )
    )

  // Media
  poster: Poster | null
  images!: Poster[]
  static videos: Resolver<TV, { filter: Record<any, any> }, Video[]> = (
    { _videos },
    { filter = {} }
  ) => _videos.filter(filterResults, filter) || []

  constructor({
    poster_path: poster,
    season_number: number,
    air_date: aired,
    episodes,
    credits,
    images,
    videos,
    ...rest
  }: Season) {
    Object.assign(this, rest)
    this.poster = createNullable(poster, Poster)
    this.number = number
    this.aired = aired
    this.episodeCount = (episodes as unknown as any[]).length
    this._episodes = episodes
    this._credits = credits
    const { posters } = images as unknown as Record<string, Poster[]>
    this.images = mapToModel(posters, Poster)
    this._videos = mapToModel(
      (videos as unknown as { results: Video[] }).results,
      Video
    )
  }
}
