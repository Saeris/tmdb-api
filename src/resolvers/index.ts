import {
  Backdrop,
  Credit,
  Collection,
  Episode,
  Logo,
  Movie,
  Person,
  Photo,
  Poster,
  Review,
  Season,
  Still,
  TV
} from "../models"
import { enums } from "./enums"
import { unions } from "./unions"
import * as Query from "./Query"

export const resolvers = {
  ...enums,
  ...unions,
  Credit,
  Backdrop,
  Collection,
  Episode,
  Logo,
  Movie,
  Person,
  Photo,
  Poster,
  Query,
  Review,
  Season,
  Still,
  TV
}
