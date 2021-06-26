import type { Model, Resolver } from "./utils";
import { setLanguage } from "./utils"
import type {
  Query,
  ByID,
  ByIDList,
  ByPage,
  ByLanguage,
  Timeframe,
  Filter,
  SortBy,
  DiscoverMoviesFilter,
  DiscoverTVFilter,
  DiscoverMoviesSortBy,
  DiscoverTVSortBy
} from "../sources"

export const countries: Resolver<{}, {}, Promise<Model<"country">[]>> = async (
  _,
  args,
  { dataSources },
  info
) => dataSources.TMDB.countries(args, info)

export const jobs: Resolver<{}, {}, Promise<Model<"job">[]>> = async (
  _,
  args,
  { dataSources },
  info
) => dataSources.TMDB.jobs(args, info)

export const languages: Resolver<{}, {}, Promise<Model<"language">[]>> = async (
  _,
  args,
  { dataSources },
  info
) => dataSources.TMDB.languages(args, info)

export const timezones: Resolver<{}, {}, Promise<Model<"timezone">[]>> = async (
  _,
  args,
  { dataSources },
  info
) => dataSources.TMDB.timezones(args, info)

export const collection: Resolver<
  {},
  ByID & ByLanguage,
  Promise<Model<"collection">>
> = async (_, args, { dataSources }, info) => dataSources.TMDB.collection(args, info)

export const movieGenres: Resolver<
  {},
  ByLanguage,
  Promise<Model<"genre">[]>
> = setLanguage(async (_, args, context, info) =>
  context.dataSources.TMDB.movieGenres(args, info)
)

export const tvGenres: Resolver<
  {},
  ByLanguage,
  Promise<Model<"genre">[]>
> = setLanguage(async (_, args, context, info) =>
  context.dataSources.TMDB.tvGenres(args, info)
)

export const movie: Resolver<
  {},
  ByID & ByLanguage,
  Promise<Model<"movie">>
> = setLanguage(async (_, args, context, info) =>
  context.dataSources.TMDB.movie(args, info)
)

export const person: Resolver<
  {},
  ByID & ByLanguage,
  Promise<Model<"person">>
> = setLanguage(async (_, args, context, info) =>
  context.dataSources.TMDB.person(args, info)
)

export const tv: Resolver<
  {},
  ByID & ByLanguage,
  Promise<Model<"tv">>
> = setLanguage(async (_, args, context, info) =>
  context.dataSources.TMDB.tv(args, info)
)

export const review: Resolver<{}, ByID, Promise<Model<"review">>> = async (
  _,
  args,
  { dataSources },
  info
) => dataSources.TMDB.review(args, info)

export const movies: Resolver<
  {},
  ByIDList & ByLanguage,
  Promise<Model<"movie">[]>
> = setLanguage(async (_, { ids, ...args }, context, info) =>
  Promise.all(
    ids.map(async (id) => context.dataSources.TMDB.movie({ id, ...args }, info))
  )
)

export const people: Resolver<
  {},
  ByIDList & ByLanguage,
  Promise<Model<"person">[]>
> = setLanguage(async (_, { ids, ...args }, context, info) =>
  Promise.all(
    ids.map(async (id) => context.dataSources.TMDB.person({ id, ...args }, info))
  )
)

export const shows: Resolver<
  {},
  ByIDList & ByLanguage,
  Promise<Model<"tv">[]>
> = setLanguage(async (_, { ids, ...args }, context, info) =>
  Promise.all(
    ids.map(async (id) => context.dataSources.TMDB.tv({ id, ...args }, info))
  )
)

export const reviews: Resolver<{}, ByIDList, Promise<Model<"review">[]>> = async (
  _,
  { ids, ...args },
  { dataSources },
  info
) =>
  Promise.all(ids.map(async (id) => dataSources.TMDB.review({ id, ...args }, info)))

export const latestMovie: Resolver<
  {},
  ByLanguage,
  Promise<Model<"movie">>
> = setLanguage(async (_, args, context, info) =>
  context.dataSources.TMDB.latestMovie(args, info)
)

export const latestPerson: Resolver<
  {},
  ByLanguage,
  Promise<Model<"person">>
> = setLanguage(async (_, args, context, info) =>
  context.dataSources.TMDB.latestPerson(args, info)
)

export const latestTV: Resolver<
  {},
  ByLanguage,
  Promise<Model<"tv">>
> = setLanguage(async (_, args, context, info) =>
  context.dataSources.TMDB.latestTV(args, info)
)

export const popularMovies: Resolver<
  {},
  ByPage & ByLanguage,
  Promise<Model<"movie">[]>
> = setLanguage(async (_, args, context, info) =>
  context.dataSources.TMDB.popularMovies(args, info)
)

export const popularPeople: Resolver<
  {},
  ByPage & ByLanguage,
  Promise<Model<"person">[]>
> = setLanguage(async (_, args, context, info) =>
  context.dataSources.TMDB.popularPeople(args, info)
)

export const popularTV: Resolver<
  {},
  ByPage & ByLanguage,
  Promise<Model<"tv">[]>
> = setLanguage(async (_, args, context, info) =>
  context.dataSources.TMDB.popularTV(args, info)
)

export const search: Resolver<
  {},
  Query & ByPage & ByLanguage,
  Promise<Model<"movie" | "person" | "tv">[]>
> = setLanguage(async (_, args, context, info) =>
  context.dataSources.TMDB.search(args, info)
)

export const searchMovies: Resolver<
  {},
  Query & ByPage & ByLanguage,
  Promise<Model<"movie">[]>
> = setLanguage(async (_, args, context, info) =>
  context.dataSources.TMDB.searchMovies(args, info)
)

export const searchPeople: Resolver<
  {},
  Query & ByPage & ByLanguage,
  Promise<Model<"person">[]>
> = setLanguage(async (_, args, context, info) =>
  context.dataSources.TMDB.searchPeople(args, info)
)

export const searchTV: Resolver<
  {},
  Query & ByPage & ByLanguage,
  Promise<Model<"tv">[]>
> = setLanguage(async (_, args, context, info) =>
  context.dataSources.TMDB.searchTVShows(args, info)
)

export const discoverMovies: Resolver<
  {},
  Filter<DiscoverMoviesFilter> &
    SortBy<DiscoverMoviesSortBy> &
    ByPage &
    ByLanguage,
  Promise<Model<"movie">[]>
> = setLanguage(async (_, args, context, info) =>
  context.dataSources.TMDB.discoverMovies(args, info)
)

export const discoverTV: Resolver<
  {},
  Filter<DiscoverTVFilter> & SortBy<DiscoverTVSortBy> & ByPage & ByLanguage,
  Promise<Model<"tv">[]>
> = setLanguage(async (_, args, context, info) =>
  context.dataSources.TMDB.discoverTV(args, info)
)

export const nowPlaying: Resolver<
  {},
  ByPage & ByLanguage,
  Promise<Model<"movie">[]>
> = setLanguage(async (_, args, context, info) =>
  context.dataSources.TMDB.nowPlaying(args, info)
)

export const topRatedMovies: Resolver<
  {},
  ByPage & ByLanguage,
  Promise<Model<"movie">[]>
> = setLanguage(async (_, args, context, info) =>
  context.dataSources.TMDB.topRatedMovies(args, info)
)

export const upcomingMovies: Resolver<
  {},
  ByPage & ByLanguage,
  Promise<Model<"movie">[]>
> = setLanguage(async (_, args, context, info) =>
  context.dataSources.TMDB.upcomingMovies(args, info)
)

export const airingThisWeek: Resolver<
  {},
  ByPage & ByLanguage,
  Promise<Model<"tv">[]>
> = setLanguage(async (_, args, context, info) =>
  context.dataSources.TMDB.airingThisWeek(args, info)
)

export const airingToday: Resolver<
  {},
  ByPage & ByLanguage,
  Promise<Model<"tv">[]>
> = setLanguage(async (_, args, context, info) =>
  context.dataSources.TMDB.airingToday(args, info)
)

export const topRatedTV: Resolver<
  {},
  ByPage & ByLanguage,
  Promise<Model<"tv">[]>
> = setLanguage(async (_, args, context, info) =>
  context.dataSources.TMDB.topRatedTV(args, info)
)

export const trending: Resolver<
  {},
  Timeframe & ByPage,
  Promise<Model<"movie" | "person" | "tv">[]>
> = async (_, args, { dataSources }, info) => dataSources.TMDB.trending(args, info)

export const trendingMovies: Resolver<
  {},
  Timeframe & ByPage,
  Promise<Model<"movie">[]>
> = async (_, args, { dataSources }, info) =>
  dataSources.TMDB.trendingMovies(args, info)

export const trendingPeople: Resolver<
  {},
  Timeframe & ByPage,
  Promise<Model<"person">[]>
> = async (_, args, { dataSources }, info) =>
  dataSources.TMDB.trendingPeople(args, info)

export const trendingTV: Resolver<
  {},
  Timeframe & ByPage,
  Promise<Model<"tv">[]>
> = async (_, args, { dataSources }, info) =>
  dataSources.TMDB.trendingTVShows(args, info)
