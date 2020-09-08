import { Resolver } from "../resolvers/utils"
import { Cast } from "./Cast"
import { Crew } from "./Crew"
import { Movie } from "./Movie"
import { Person } from "./Person"
import { TV } from "./TV"

// check for existing role data first, then request data
// credit_id, person.id, media_type, media.id, credit_type

export class Credit {
  [key: string]: any
  id!: string
  _person?: Person
  static person: Resolver<Credit, {}, Promise<Person> | Person | null> = (
    { _person, _personId },
    { ...rest },
    { dataSources, language },
    info
  ) => {
    if (_person) return _person
    if (_personId) {
      return dataSources.TMDB.person({ id: _personId, language, ...rest }, info)
    }
    return null
  }

  _media?: Movie | TV
  static media: Resolver<Credit, {}, Promise<Movie | TV> | Movie | TV> = (
    { media_type: type, _media, _mediaId: id },
    { ...rest },
    { dataSources, language },
    info
  ) =>
    _media
      ? _media
      : dataSources.TMDB[type.toLowerCase() as "movie" | "tv"](
          { id, language, ...rest },
          info
        )

  _role?: Cast | Crew
  static role: Resolver<Credit, {}, Promise<Cast | Crew | null>> = async (
    { id, credit_type: type, _mediaId, media_type: mediaType, _role },
    { ...rest },
    { dataSources, language },
    info
  ) => {
    // Only request role data on direct credit queries
    // in all other cases, role data is filled in on instatiation
    if (_role) return _role

    const {
      [(type as unknown) as "cast" | "crew"]: results
    } = await dataSources.TMDB[
      `${mediaType.toLowerCase()}Credits` as "movieCredits" | "tvCredits"
    ]({ id: _mediaId, language, ...rest }, info)

    return (
      (results as (Cast | Crew)[])?.find(
        (role: Cast | Crew) => role.credit_id === id
      ) || null
    )
  }

  constructor({ person, media, role, ...rest }: Credit) {
    Object.assign(this, rest)
    if (person instanceof Person) {
      this._person = person
      this._personId = person.id
    } else {
      this._personId = person.id
    }
    if (media instanceof (Movie || TV)) {
      this._media = media
      this._mediaId = media.id
    } else {
      this._mediaId = media.id
    }
    this._role = role
  }
}
