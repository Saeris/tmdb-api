import { default as groupBy } from "lodash/groupBy"
import parseISO from "date-fns/parseISO"
import { Gender, getGender } from "./getGender"
import { Credit } from "./Credit"
import { Movie } from "./Movie"
import { Photo, Poster, Backdrop } from "./Images"
import { SocialMedia } from "./SocialMedia"
import { TV } from "./TV"
import {
  createNullable,
  limitResults,
  mapToCredits,
  mapToModel,
  Resolver
} from "../resolvers/utils"

type Member = "cast" | "crew"

const getCredits = (
  member: Member
  // eslint-disable-next-line no-use-before-define
): Resolver<Person, { limit?: number }, Promise<(Movie | TV)[]>> => async (
  { _credits },
  { limit, ...rest },
  { dataSources, language },
  info
) => {
  const roles =
    _credits[member].slice(0, limit ? limit : _credits[member].length) || []
  const grouped = groupBy(roles, `media_type`)
  const results = await Promise.all([
    Promise.all(
      grouped.movie.map(({ id }) =>
        dataSources.TMDB.movie({ id, language, ...rest }, info)
      )
    ),
    Promise.all(
      grouped.tv.map(({ id }) =>
        dataSources.TMDB.tv({ id, language, ...rest }, info)
      )
    )
  ])
  return results.flat()
}

export class Person {
  // eslint-disable-next-line no-undef
  [key: string]: any
  id!: string

  // General Details
  name!: string
  aliases: string[]
  knownFor: string
  biography!: string
  gender: Gender
  birthday: Date | null
  birthplace: string
  diedOn: Date | null

  // Social
  homepage: URL | null
  socialMedia: SocialMedia | null

  // Credits
  static credits: Resolver<
    Person,
    { limit: number; mediaType: ("movie" | "tv")[] },
    Promise<Credit[]>
  > = (parent, { limit, mediaType }) => {
    const { cast, crew } = mapToCredits(parent._credits, parent)
    return limitResults(
      limit,
      new Promise((resolve) =>
        resolve(
          [...cast, ...crew].filter(({ _mediaType }) =>
            mediaType.includes(_mediaType)
          )
        )
      )
    )
  }

  static appearsIn = getCredits(`cast`)
  static workedOn = getCredits(`crew`)

  // Media
  photo: Photo | null
  images: Photo[]
  taggedImages: (Poster | Backdrop)[]

  constructor({
    also_known_as: aliases,
    known_for: knownFor,
    gender,
    birthday,
    place_of_birth: birthplace,
    deathday: diedOn,
    homepage,
    external_ids: socialMedia,
    profile_path: photo,
    combined_credits: credits,
    images,
    tagged_images: taggedImages,
    ...rest
  }: Person) {
    Object.assign(this, rest)
    this.aliases = aliases
    this.knownFor = knownFor
    this.gender = getGender((gender as unknown) as number | undefined)
    this.birthday = birthday ? parseISO((birthday as unknown) as string) : null
    this.birthplace = birthplace
    this.diedOn = diedOn ? parseISO(diedOn) : null
    this.homepage = homepage ? new URL((homepage as unknown) as string) : null
    this.socialMedia = createNullable(socialMedia, SocialMedia)
    this.photo = createNullable(photo, Photo)
    const { profiles } = (images as unknown) as Record<string, Poster[]>
    this._credits = credits
    this.images = mapToModel(profiles, Photo)
    const {
      backdrops = [],
      posters = []
    } = (taggedImages as unknown) as Record<string, (Backdrop | Poster)[]>
    this.taggedImages = [
      mapToModel(backdrops, Backdrop),
      mapToModel(posters, Poster)
    ].flat() as (Poster | Backdrop)[]
  }
}
