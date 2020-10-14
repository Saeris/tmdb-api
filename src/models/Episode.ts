import { Credit } from "./Credit"
import { Season } from "./Season"
import { Still } from "./Images"
import { TV } from "./TV"
import { Video } from "./Video"
import {
  Resolver,
  limitResults,
  filterResults,
  mapToCredits,
  mapToModel
} from "../resolvers/utils"

export class Episode {
  // eslint-disable-next-line no-undef
  [key: string]: any
  // eslint-disable-next-line camelcase
  media_type: string = `tv`
  id!: string

  // General Details
  series!: TV
  season!: Season
  number: number
  name!: string
  overview!: string
  aired: Date

  // Credits
  static cast: Resolver<Episode, { limit: number }, Promise<Credit[]>> = (
    parent,
    { limit }
  ) =>
    limitResults(
      limit,
      new Promise((resolve) =>
        resolve(mapToCredits(parent._credits, parent).cast)
      )
    )

  static crew: Resolver<Episode, { limit: number }, Promise<Credit[]>> = (
    parent,
    { limit }
  ) =>
    limitResults(
      limit,
      new Promise((resolve) =>
        resolve(mapToCredits(parent._credits, parent).crew)
      )
    )

  static guests: Resolver<Episode, { limit: number }, Promise<Credit[]>> = (
    parent,
    { limit }
  ) =>
    limitResults(
      limit,
      new Promise((resolve) =>
        resolve(mapToCredits(parent._credits, parent).guests)
      )
    )

  // Ratings
  score: number
  votes: number

  // Media
  still: Still | null
  images!: Still[]
  static videos: Resolver<Episode, { filter: Record<any, any> }, Video[]> = (
    { _videos },
    { filter = {} }
  ) => _videos.filter(filterResults, filter) || []

  constructor({
    episode_number: number,
    still_path: still,
    air_date: aired,
    vote_average: score,
    vote_count: votes,
    credits,
    images,
    videos,
    ...rest
  }: Episode) {
    Object.assign(this, rest)
    this.number = number
    this.still = still ? new Still(still) : null
    this.aired = aired
    this.score = score
    this.votes = votes
    this._credits = credits
    const { stills } = (images as unknown) as Record<string, Still[]>
    this.images = mapToModel(stills, Still)
    this._videos = mapToModel(
      ((videos as unknown) as { results: Video[] }).results,
      Video
    )
  }
}
