import parseISO from "date-fns/parseISO"
import { Company } from "./Company"
import { Country } from "./Country"
import { Credit } from "./Credit"
import { Episode } from "./Episode"
import { Genre } from "./Genre"
import { Language } from "./Language"
import { Network } from "./Network"
import { Person } from "./Person"
import { Poster, Backdrop } from "./Images"
import { Review } from "./Review"
import { Season } from "./Season"
import { SocialMedia } from "./SocialMedia"
import { Video } from "./Video"
import {
  Resolver,
  limitResults,
  filterResults,
  createNullable,
  mapToModel,
  mapToCredits
} from "../resolvers/utils"
import { ByPage } from "../sources"

const TVType = {
  Scripted: `Scripted`,
  Reality: `Reality`,
  Documentary: `Documentary`,
  News: `News`,
  TalkShow: `Talk Show`,
  Miniseries: `Miniseries`
} as const

const TVStatus = {
  ReturningSeries: `Returning Series`,
  Planned: `Planned`,
  InProduction: `In Production`,
  Ended: `Ended`,
  Canceled: `Canceled`,
  Pilot: `Pilot`
} as const

export class TV {
  // eslint-disable-next-line no-undef
  [key: string]: any
  // eslint-disable-next-line camelcase
  media_type: string = `tv`
  id!: string

  // General Details
  name!: string
  originalName: string
  overview!: string
  static country: Resolver<TV, {}, Promise<Country[]>> = async (
    parent,
    { ...rest },
    { dataSources },
    info
  ) => {
    const countries = await dataSources.TMDB.countries({ ...rest }, info)
    return countries.filter(({ code }) => parent.origin_country.includes(code))
  }

  language: Language
  languages!: Language[]
  type: typeof TVType[keyof typeof TVType] | null
  status: typeof TVStatus[keyof typeof TVStatus] | null
  genres: Genre[]
  inProduction: boolean
  firstAired: Date | null
  lastAired: Date | null
  runtime: number[]

  // People & Companies
  static createdBy: Resolver<TV, {}, Promise<Person[]>> = (
    parent,
    { ...rest },
    { dataSources, language },
    info
  ) =>
    Promise.all(
      parent.created_by.map(({ id }: { id: string }) =>
        dataSources.TMDB.person({ id, language, ...rest }, info)
      )
    )

  static cast: Resolver<TV, { limit: number }, Promise<Credit[]>> = (
    parent,
    { limit }
  ) =>
    limitResults(
      limit,
      new Promise((resolve) =>
        resolve(mapToCredits(parent._credits, parent).cast)
      )
    )

  static crew: Resolver<TV, { limit: number }, Promise<Credit[]>> = (
    parent,
    { limit }
  ) =>
    limitResults(
      limit,
      new Promise((resolve) =>
        resolve(mapToCredits(parent._credits, parent).crew)
      )
    )

  static networks: Resolver<TV, {}, Promise<Network[]>> = (
    { _networks },
    _,
    { dataSources },
    info
  ) =>
    Promise.all(
      (_networks as Network[]).map(({ id }) =>
        dataSources.TMDB.network({ id }, info)
      )
    )

  static productionCompanies: Resolver<TV, {}, Promise<Company[]>> = (
    { _productionCompanies },
    _,
    { dataSources },
    info
  ) =>
    Promise.all(
      _productionCompanies.map(({ id }: { id: string }) =>
        dataSources.TMDB.company({ id }, info)
      )
    )

  // Social
  homepage: URL | null
  socialMedia!: SocialMedia | null

  // Seasons & Episodes
  seasonCount: number

  static seasons: Resolver<TV, {}, Promise<Season[]>> = async (
    parent,
    { ...rest },
    { dataSources, language },
    info
  ) => {
    const results = await Promise.all(
      (parent._seasons as Season[]).map(({ season_number: season }) =>
        dataSources.TMDB.season(
          { show: parent.id, season, language, ...rest },
          info
        )
      )
    )
    return results.map((season) => ({ ...season, series: parent }))
  }

  episodeCount: number

  episodes: Resolver<TV, {}, Promise<Episode[]>> = async (
    parent,
    { ...rest },
    { dataSources, language },
    info
  ) => {
    const fetchedSeasons = await Promise.all(
      (parent._seasons as Season[]).map(({ id: season }) =>
        dataSources.TMDB.season({ show: parent.id, season }, info)
      )
    )
    return Promise.all(
      fetchedSeasons.flatMap(({ season_number: season, episodes: eps }) =>
        ((eps as unknown) as Episode[]).map(({ episode_number: episode }) =>
          dataSources.TMDB.episode(
            { show: parent.id, season, episode, language, ...rest },
            info
          )
        )
      )
    )
  }

  // Media
  poster: Poster | null
  backdrop: Backdrop | null
  images!: (Poster | Backdrop)[]
  static videos: Resolver<TV, { filter: Record<any, any> }, Video[]> = (
    { _videos },
    { filter = {} }
  ) => _videos.filter(filterResults, filter) || []

  // Ratings & Reviews
  popularity!: number
  score: number
  votes: number
  static reviews: Resolver<
    TV,
    { limit: number } & ByPage,
    Promise<Review[]>
  > = (
    { id, _reviews },
    { limit, page, ...rest },
    { dataSources, language },
    info
  ) =>
    limitResults(
      limit,
      page && page > 1
        ? dataSources.TMDB.movieReviews({ id, page, language, ...rest }, info)
        : new Promise<Review[]>((resolve) => resolve(_reviews || []))
    )

  // Related
  static recommended: Resolver<TV, { limit: number }, Promise<TV[]>> = (
    { id },
    { limit, ...rest },
    { dataSources, language },
    info
  ) =>
    limitResults(
      limit,
      dataSources.TMDB.recommendedShows({ id, language, ...rest }, info)
    )

  static similar: Resolver<TV, { limit: number }, Promise<TV[]>> = (
    { id },
    { limit, ...rest },
    { dataSources, language },
    info
  ) =>
    limitResults(
      limit,
      dataSources.TMDB.similarShows({ id, language, ...rest }, info)
    )

  constructor({
    original_name: originalName,
    origin_country: country,
    original_language: language,
    type,
    status,
    genres,
    in_production: inProduction,
    first_air_date: firstAired,
    last_air_date: lastAired,
    episode_run_time: runtime,
    homepage,
    poster_path: poster,
    backdrop_path: backdrop,
    number_of_seasons: seasonCount,
    number_of_episodes: episodeCount,
    vote_average: score,
    vote_count: votes,
    external_ids: socialMedia,
    production_companies: productionCompanies,
    credits,
    reviews,
    images,
    seasons,
    networks,
    videos,
    ...rest
  }: TV) {
    Object.assign(this, rest)
    this.originalName = originalName
    this.country = country
    this.language = language
    this.type = type || null
    this.status = status || null
    this.genres = mapToModel(genres, Genre)
    this.inProduction = inProduction
    this.firstAired = firstAired ? parseISO(firstAired) : null
    this.lastAired = lastAired ? parseISO(lastAired) : null
    this.runtime = runtime
    this.homepage = homepage ? new URL((homepage as unknown) as string) : null
    this.poster = createNullable(poster, Poster)
    this.backdrop = createNullable(backdrop, Backdrop)
    this.seasonCount = seasonCount
    this.episodeCount = episodeCount
    this.score = score
    this.votes = votes
    this._credits = credits
    this._reviews = reviews.results

    const { backdrops, posters } = (images as unknown) as Record<
      string,
      (Backdrop | Poster)[]
    >

    this.images = [
      mapToModel(backdrops, Backdrop),
      mapToModel(posters, Poster)
    ].flat() as (Poster | Backdrop)[]
    this.socialMedia = createNullable(socialMedia, SocialMedia)
    this._seasons = seasons
    this._productionCompanies = productionCompanies
    this._networks = networks
    this._videos = mapToModel((videos.results as unknown) as Video[], Video)
  }
}
