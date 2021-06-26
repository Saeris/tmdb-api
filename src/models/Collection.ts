import type { ByLanguage } from "../sources"
import type { Resolver } from "../resolvers/utils"
import { setLanguage, createNullable } from "../resolvers/utils"
import { Backdrop, Poster } from "./Images"
import type { Movie } from "./Movie"

export class Collection {
  // eslint-disable-next-line no-undef
  [key: string]: any
  id!: string

  // General Details
  name!: string
  overview!: string
  parts!: Promise<Movie[]>
  static parts: Resolver<Collection, ByLanguage, Promise<Movie[]>> =
    setLanguage(async ({ _parts: ids }, args, context, info) =>
      Promise.all(
        (ids as unknown as { id: string }[]).map(async ({ id }) =>
          context.dataSources.TMDB.movie(
            { id, language: context.language, ...args },
            info
          )
        )
      )
    )

  // Media
  poster: Poster | null
  backdrop: Backdrop | null
  static images: Resolver<
    Collection,
    ByLanguage,
    Promise<(Poster | Backdrop)[]>
  > = async ({ id }, args, { dataSources, language }, info) => {
    const { backdrops, posters } = await dataSources.TMDB.collectionImages(
      { id, language, ...args },
      info
    )
    return [...backdrops, ...posters]
  }

  constructor({
    poster_path: poster,
    backdrop_path: backdrop,
    parts,
    ...rest
  }: Collection) {
    Object.assign(this, rest)
    this._parts = parts
    this.poster = createNullable(poster, Poster)
    this.backdrop = createNullable(backdrop, Backdrop)
  }
}
