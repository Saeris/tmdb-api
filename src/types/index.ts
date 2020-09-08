import { enums } from "./enums"
import { inputs } from "./inputs"
import { interfaces } from "./interfaces"
import { scalars } from "./scalars"
import { unions } from "./unions"
import { default as Backdrop } from "./Backdrop.gql"
import { default as Cast } from "./Cast.gql"
import { default as Collection } from "./Collection.gql"
import { default as Company } from "./Company.gql"
import { default as Country } from "./Country.gql"
import { default as Credit } from "./Credit.gql"
import { default as Crew } from "./Crew.gql"
import { default as Episode } from "./Episode.gql"
import { default as ExtractedColors } from "./ExtractedColors.gql"
import { default as Genre } from "./Genre.gql"
import { default as Job } from "./Job.gql"
import { default as Keyword } from "./Keyword.gql"
import { default as Language } from "./Language.gql"
import { default as Logo } from "./Logo.gql"
import { default as Movie } from "./Movie.gql"
import { default as Network } from "./Network.gql"
import { default as Person } from "./Person.gql"
import { default as Photo } from "./Photo.gql"
import { default as Poster } from "./Poster.gql"
import { default as Query } from "./Query.gql"
import { default as Review } from "./Review.gql"
import { default as Schema } from "./Schema.gql"
import { default as SocialMedia } from "./SocialMedia.gql"
import { default as Season } from "./Season.gql"
import { default as Still } from "./Still.gql"
import { defualt as Timezone } from "./Timezone.gql"
import { default as TV } from "./TV.gql"
import { default as Video } from "./Video.gql"

export { resolvers as scalarResolvers } from "./scalars"

export const types = [
  ...enums,
  ...inputs,
  ...interfaces,
  ...scalars,
  ...unions,
  Backdrop,
  Cast,
  Collection,
  Company,
  Country,
  Credit,
  Crew,
  Episode,
  ExtractedColors,
  Genre,
  Job,
  Keyword,
  Language,
  Logo,
  Movie,
  Network,
  Person,
  Photo,
  Poster,
  Query,
  Review,
  Schema,
  Season,
  SocialMedia,
  Still,
  Timezone,
  TV,
  Video
]
