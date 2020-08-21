import { groupBy } from "lodash";
import { GraphQLResolveInfo } from "graphql";
import { Resolver } from "./Resolver";
import { Sources } from "../sources";

const mapResults = (type?: "movie" | "tv") => (
  results: { id: string }[],
  dataSources: Sources,
  info: GraphQLResolveInfo
) =>
  Promise.all(
    results.map(({ id }) => dataSources.MovieDB[type || `person`]({ id }, info))
  );

export const movie: Resolver<{}, { id: string }> = (
  _,
  { id },
  { dataSources },
  info
) => dataSources.MovieDB.movie({ id }, info);

export const person: Resolver<{}, { id: string }> = (
  _,
  { id },
  { dataSources },
  info
) => dataSources.MovieDB.person({ id }, info);

export const tv: Resolver<{}, { id: string }> = (
  _,
  { id },
  { dataSources },
  info
) => dataSources.MovieDB.tv({ id }, info);

export const popularMovies: Resolver<{}, { page: number }> = async (
  _,
  { page = 1 },
  { dataSources },
  info
) => {
  const { results } = await dataSources.MovieDB.popularMovies({ page }, info);
  return mapResults(`movie`)(results, dataSources, info);
};

export const popularPeople: Resolver<{}, { page: number }> = async (
  _,
  { page = 1 },
  { dataSources },
  info
) => {
  const { results } = await dataSources.MovieDB.popularPeople({ page }, info);
  return mapResults()(results, dataSources, info);
};

export const popularTV: Resolver<{}, { page: number }> = async (
  _,
  { page = 1 },
  { dataSources },
  info
) => {
  const { results } = await dataSources.MovieDB.popularTV({ page }, info);
  return mapResults(`tv`)(results, dataSources, info);
};

export const search: Resolver<{}, { query: string; page: number }> = async (
  _,
  { query = ``, page = 1 },
  { dataSources },
  info
) => {
  const { results } = await dataSources.MovieDB.search({ query, page }, info);
  const grouped = groupBy(results, `media_type`);
  const resolved = await Promise.all([
    mapResults(`movie`)(grouped.movie, dataSources, info),
    mapResults()(grouped.undefined, dataSources, info),
    mapResults(`tv`)(grouped.movie, dataSources, info)
  ]);
  return [
    ...resolved[0].map(movie => ({ ...movie, media_type: `movie` })), // eslint-disable-line
    ...resolved[1],
    ...resolved[2].map(show => ({ ...show, media_type: `tv` }))
  ];
};

export const searchMovies: Resolver<
  {},
  { query: string; page: number }
> = async (_, { query = ``, page = 1 }, { dataSources }, info) => {
  const { results } = await dataSources.MovieDB.searchMovies(
    { query, page },
    info
  );
  return mapResults(`movie`)(results, dataSources, info);
};

export const searchPeople: Resolver<
  {},
  { query: string; page: number }
> = async (_, { query = ``, page = 1 }, { dataSources }, info) => {
  const { results } = await dataSources.MovieDB.searchPeople(
    { query, page },
    info
  );
  return mapResults()(results, dataSources, info);
};

export const searchTV: Resolver<{}, { query: string; page: number }> = async (
  _,
  { query = ``, page = 1 },
  { dataSources },
  info
) => {
  const { results } = await dataSources.MovieDB.searchTVShows(
    { query, page },
    info
  );
  return mapResults(`tv`)(results, dataSources, info);
};

export const nowPlaying: Resolver<{}, { page: number }> = async (
  _,
  { page = 1 },
  { dataSources },
  info
) => {
  const { results } = await dataSources.MovieDB.nowPlaying({ page }, info);
  return mapResults(`movie`)(results, dataSources, info);
};

export const topRatedMovies: Resolver<{}, { page: number }> = async (
  _,
  { page = 1 },
  { dataSources },
  info
) => {
  const { results } = await dataSources.MovieDB.topRatedMovies({ page }, info);
  return mapResults(`movie`)(results, dataSources, info);
};

export const upcomingMovies: Resolver<{}, { page: number }> = async (
  _,
  { page = 1 },
  { dataSources },
  info
) => {
  const { results } = await dataSources.MovieDB.upcomingMovies({ page }, info);
  return mapResults(`movie`)(results, dataSources, info);
};

export const airingThisWeek: Resolver<{}, { page: number }> = async (
  _,
  { page = 1 },
  { dataSources },
  info
) => {
  const { results } = await dataSources.MovieDB.airingThisWeek({ page }, info);
  return mapResults(`tv`)(results, dataSources, info);
};

export const airingToday: Resolver<{}, { page: number }> = async (
  _,
  { page = 1 },
  { dataSources },
  info
) => {
  const { results } = await dataSources.MovieDB.airingToday({ page }, info);
  return mapResults(`tv`)(results, dataSources, info);
};

export const topRatedTV: Resolver<{}, { page: number }> = async (
  _,
  { page = 1 },
  { dataSources },
  info
) => {
  const { results } = await dataSources.MovieDB.topRatedTV({ page }, info);
  return mapResults(`tv`)(results, dataSources, info);
};
