import { Resolver } from "../resolvers/utils"
import { Language } from "./Language"
import { Movie } from "./Movie"
import { TV } from "./TV"

export class Review {
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
      ? languages.find(({ code }) => parent.iso_639_1.includes(code)) || null
      : null
  }

  static media: Resolver<Review, {}, Promise<Movie | TV>> = (
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
    this.url = new URL((url as unknown) as string)
  }
}
