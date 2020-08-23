import { enums } from "./enums"
import { inputs } from "./inputs"
import { interfaces } from "./interfaces"
import { unions } from "./unions"
import { default as Backdrop } from "./backdrop.gql"
import { default as Cast } from "./cast.gql"
import { default as Company } from "./company.gql"
import { default as Crew } from "./crew.gql"
import { default as Episode } from "./episode.gql"
import { default as ExtractedColors } from "./extractedColors.gql"
import { default as Genre } from "./genre.gql"
import { default as Guest } from "./guest.gql"
import { default as Language } from "./language.gql"
import { default as Logo } from "./logo.gql"
import { default as Movie } from "./movie.gql"
import { default as Network } from "./network.gql"
import { default as Person } from "./person.gql"
import { default as Photo } from "./photo.gql"
import { default as Poster } from "./poster.gql"
import { default as Query } from "./query.gql"
import { default as Schema } from "./schema.gql"
import { default as Season } from "./season.gql"
import { default as Still } from "./still.gql"
import { default as TV } from "./tv.gql"
import { default as Video } from "./video.gql"

export const types = [
	...enums,
	...inputs,
	...interfaces,
	...unions,
	Backdrop,
	Cast,
	Company,
	Crew,
	Episode,
	ExtractedColors,
	Genre,
	Guest,
	Language,
	Logo,
	Movie,
	Network,
	Person,
	Photo,
	Poster,
	Query,
	Schema,
	Season,
	Still,
	TV,
	Video
];
