import { Resolver } from "./Resolver";

export { cast, crew, similar, videos } from "./shared";

export const poster = (parent: Record<string, string>) => parent.poster_path;

export const backdrop = (parent: Record<string, string>) =>
  parent.backdrop_path;

export const type = (parent: Record<string, string>) =>
  parent.type.replace(/\s/g, ``);

export const status = (parent: Record<string, string>) =>
  parent.status.replace(/\s/g, ``);

// eslint-disable-next-line camelcase
export const createdBy: Resolver<{ created_by: { id: string }[] }> = (
  parent,
  _,
  { dataSources },
  info
) =>
  Promise.all(
    parent.created_by.map(({ id }) => dataSources.MovieDB.person({ id }, info))
  );

export const networks: Resolver<{ networks: { id: string }[] }> = (
  parent,
  _,
  { dataSources },
  info
) =>
  Promise.all(
    parent.networks.map(({ id }) => dataSources.MovieDB.network({ id }, info))
  );

export const productionCompanies: Resolver<{
  // eslint-disable-next-line camelcase
  production_companies: { id: string }[];
}> = (parent, _, { dataSources }, info) =>
  Promise.all(
    parent.production_companies.map(({ id }) =>
      dataSources.MovieDB.company({ id }, info)
    )
  );

export const seasonCount = (parent: Record<string, string>) =>
  parent.number_of_seasons;

export const seasons: Resolver<{
  id: string;
  // eslint-disable-next-line camelcase
  seasons: { season_number: string }[];
}> = async (parent, _, { dataSources }, info) => {
  const results = await Promise.all(
    parent.seasons.map(({ season_number: season }) =>
      dataSources.MovieDB.season({ show: parent.id, season }, info)
    )
  );
  return results.map(season => ({ ...season, series: parent }));
};

export const episodeCount = (parent: Record<string, string>) =>
  parent.number_of_episodes;

export const episodes: Resolver<{
  id: string;
  // eslint-disable-next-line camelcase
  seasons: { id: string }[];
}> = async (parent, _, { dataSources }, info) => {
  const fetchedSeasons = await Promise.all(
    parent.seasons.map(({ id: season }) =>
      dataSources.MovieDB.season({ show: parent.id, season }, info)
    )
  );
  const results = await Promise.all(
    fetchedSeasons.map(({ season_number: season, episodes: eps }) =>
      // eslint-disable-next-line camelcase
      eps.map(({ episode_number: episode }: { episode_number: string }) =>
        dataSources.MovieDB.episode({ show: parent.id, season, episode }, info)
      )
    )
  );
  return results
    .reduce((list, season) => [...list, ...season], [])
    .map((episode: Record<any, any>) => ({ ...episode, series: parent }));
};

export const country = (parent: Record<string, string>) =>
  parent.origin_country;

export const language = (parent: Record<string, string>) =>
  parent.original_language;

export const originalName = (parent: Record<string, string>) =>
  parent.original_name;

export const score = (parent: Record<string, string>) => parent.vote_average;

export const votes = (parent: Record<string, string>) => parent.vote_count;

export const inProduction = (parent: Record<string, string>) =>
  parent.in_production;
export const firstAired = (parent: Record<string, string>) =>
  parent.first_air_date;
export const lastAired = (parent: Record<string, string>) =>
  parent.last_air_date;
export const runtime = (parent: Record<string, string>) =>
  parent.episode_run_time;
