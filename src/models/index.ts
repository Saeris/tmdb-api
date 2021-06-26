import { Cast } from "./Cast"
import { Collection } from "./Collection"
import { Company } from "./Company"
import { Country } from "./Country"
import { Credit } from "./Credit"
import { Crew } from "./Crew"
import { Episode } from "./Episode"
import { Genre } from "./Genre"
import { ImageType, Backdrop, Logo, Photo, Poster, Still } from "./Images"
import { Job } from "./Job"
import { Keyword } from "./Keyword"
import { Language } from "./Language"
import { Movie } from "./Movie"
import { Network } from "./Network"
import { Person } from "./Person"
import { Review } from "./Review"
import { Season } from "./Season"
import { SocialMedia } from "./SocialMedia"
import { Timezone } from "./Timezone"
import { TV } from "./TV"
import { Video } from "./Video"

export {
  Cast,
  Collection,
  Company,
  Country,
  Credit,
  Crew,
  Episode,
  Genre,
  ImageType,
  Backdrop,
  Logo,
  Photo,
  Poster,
  Still,
  Job,
  Keyword,
  Language,
  Movie,
  Network,
  Person,
  Review,
  Season,
  SocialMedia,
  Timezone,
  TV,
  Video
}

const create =
  <T, A = T>(C: { new (args: A): T }): ((args: A) => T) =>
  (args: A) =>
    new C(args)

export const models = {
  cast: create(Cast),
  collection: create(Collection),
  company: create(Company),
  country: create(Country),
  credit: create(Credit),
  crew: create(Crew),
  episode: create(Episode),
  genre: create(Genre),
  imageType: create(ImageType),
  backdrop: create(Backdrop),
  logo: create(Logo),
  photo: create(Photo),
  poster: create(Poster),
  still: create(Still),
  job: create(Job),
  keyword: create(Keyword),
  language: create(Language),
  movie: create(Movie),
  network: create(Network),
  person: create(Person),
  review: create(Review),
  season: create(Season),
  socialMedia: create(SocialMedia),
  timezone: create(Timezone),
  tv: create(TV),
  video: create(Video)
}
