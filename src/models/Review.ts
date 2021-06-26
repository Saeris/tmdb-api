import type { Resolver } from "../resolvers/utils"
import type { Language } from "./Language"
import type { Movie } from "./Movie"
import type { TV } from "./TV"

export class Review {
  // eslint-disable-next-line no-undef
  [key: string]: any
  id!: string
  author!: string
  content!: string
  static language: Resolver<TV, {}, Promise<Language | null>> = async (
    parent,
    { ...rest },
    { dataSources },
    info
  ) => {
    const languages = await dataSources.TMDB.languages({ ...rest }, info)
    return parent.iso_639_1
      ? languages.find(({ code }) => parent.iso_639_1.includes(code)) ?? null
      : null
  }

  static media: Resolver<Review, {}, Promise<Movie | TV>> = async (
    { media_type: type, media_id: id },
    { ...rest },
    // eslint-disable-next-line no-shadow
    { dataSources, language },
    info
  ) =>
    dataSources.TMDB[type.toLowerCase() as "movie" | "tv"](
      { id, language, ...rest },
      info
    )

  url: URL

  constructor({ url, ...rest }: Review) {
    Object.assign(this, rest)
    this.url = new URL(url as unknown as string)
  }
}
