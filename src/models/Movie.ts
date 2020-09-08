import parseISO from "date-fns/parseISO"
import { Backdrop, Poster } from "./Images"
import { Credit } from "./Credit"
import { Company } from "./Company"
import { Collection } from "./Collection"
import { Country } from "./Country"
import { Genre } from "./Genre"
import { Language } from "./Language"
import { Review } from "./Review"
import { SocialMedia } from "./SocialMedia"
import { Video } from "./Video"
import { Keyword } from "./Keyword"
import { ByLanguage, ByPage } from "../sources"
import {
  Resolver,
  limitResults,
  filterResults,
  mapToCredits,
  mapToModel,
  createNullable
} from "../resolvers/utils"

export const ReleaseStatus = {
  Rumored: `Rumored`,
  Planned: `Planned`,
  InProduction: `In Production`,
  PostProduction: `Post Production`,
  Released: `Released`,
  Canceled: `Canceled`
} as const

export class Movie {
  [key: string]: any
  // eslint-disable-next-line
  media_type: string = `movie`
  id!: string

  // General Details
  name!: string
  tagline?: string
  overview!: string
  country: Country[]
  languages: Language[]
  status: typeof ReleaseStatus[keyof typeof ReleaseStatus] | null
  genres: Genre[]
  keywords: Keyword[]
  releaseDate: Date | null
  runtime?: number
  budget!: number
  revenue!: string
  adult!: boolean

  // People & Companies
  static cast: Resolver<Movie, { limit: number }, Promise<Credit[]>> = (
    parent,
    { limit }
  ) =>
    limitResults(
      limit,
      new Promise(resolve =>
        resolve(mapToCredits(parent._credits, parent).cast)
      )
    )

  static crew: Resolver<Movie, { limit: number }, Promise<Credit[]>> = (
    parent,
    { limit }
  ) =>
    limitResults(
      limit,
      new Promise(resolve =>
        resolve(mapToCredits(parent._credits, parent).crew)
      )
    )

  static productionCompanies: Resolver<Movie, {}, Promise<Company[]>> = (
    { _productionCompanies },
    args,
    { dataSources },
    info
  ) =>
    Promise.all(
      _productionCompanies.map(({ id }: Company) =>
        dataSources.TMDB.company({ id, ...args }, info)
      )
    )

  // Social
  homepage: URL | null
  socialMedia!: SocialMedia | null

  // Media
  poster: Poster | null
  backdrop: Backdrop | null
  images: (Poster | Backdrop)[]
  static videos: Resolver<Movie, { filter: Record<any, any> }, Video[]> = (
    { _videos },
    { filter = {} }
  ) => _videos.filter(filterResults, filter) || []

  // Ratings & Reviews
  popularity!: number
  score: number
  votes: number
  static reviews: Resolver<
    Movie,
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
        : new Promise<Review[]>(resolve => resolve(_reviews || []))
    )

  // Related
  static collection: Resolver<Movie, ByLanguage, Promise<Collection> | null> = (
    { belongs_to_collection: rawCollection },
    args,
    { dataSources, language },
    info
  ) => {
    if (rawCollection) {
      return dataSources.TMDB.collection(
        { id: rawCollection.id, language, ...args },
        info
      )
    }
    return null
  }

  static recommended: Resolver<Movie, { limit: number }, Promise<Movie[]>> = (
    { id },
    { limit, ...rest },
    { dataSources, language },
    info
  ) =>
    limitResults(
      limit,
      dataSources.TMDB.recommendedMovies({ id, language, ...rest }, info)
    )

  static similar: Resolver<Movie, { limit: number }, Promise<Movie[]>> = (
    { id },
    { limit, ...rest },
    { dataSources, language },
    info
  ) =>
    limitResults(
      limit,
      dataSources.TMDB.similarMovies({ id, language, ...rest }, info)
    )

  constructor({
    title: name,
    status,
    release_date: releaseDate,
    homepage,
    poster_path: poster,
    backdrop_path: backdrop,
    vote_average: score,
    vote_count: votes,
    genres,
    production_countries: countries,
    spoken_languages: languages,
    credits,
    reviews,
    images,
    keywords,
    videos,
    external_ids: socialMedia,
    production_companies: productionCompanies,
    ...rest
  }: Movie) {
    Object.assign(this, rest)
    this.name = name
    this.status = status || null
    this.releaseDate = releaseDate ? parseISO(releaseDate) : null
    this.homepage = homepage ? new URL((homepage as unknown) as string) : null
    this.poster = createNullable(poster, Poster)
    this.backdrop = createNullable(backdrop, Backdrop)
    this.score = score
    this.votes = votes
    this.genres = mapToModel(genres, Genre)
    this.country = mapToModel(countries, Country)
    this.languages = mapToModel(languages, Language)

    const { backdrops, posters } = (images as unknown) as Record<
      string,
      (Backdrop | Poster)[]
    >
    this._credits = credits
    this._reviews = reviews.results
    this.images = [
      mapToModel(backdrops, Backdrop),
      mapToModel(posters, Poster)
    ].flat() as (Poster | Backdrop)[]
    this.keywords = mapToModel(
      ((keywords as unknown) as { keywords: Keyword[] }).keywords,
      Keyword
    )
    this._videos = mapToModel(
      ((videos as unknown) as { results: Video[] }).results,
      Video
    )
    this.socialMedia = socialMedia ? new SocialMedia(socialMedia) : null
    this._productionCompanies = productionCompanies
  }
}
