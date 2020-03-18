import { Resolver } from "./shared";

export const number = (parent: Record<string, string>) => parent.episode_number;

export const still = (parent: Record<string, string>) => parent.still_path;

export const aired = (parent: Record<string, string>) => parent.air_date;

export const score = (parent: Record<string, string>) => parent.vote_average;

export const votes = (parent: Record<string, string>) => parent.vote_count;

export const cast: Resolver<
  // eslint-disable-next-line camelcase
  { series: { id: string }; season: { season_number: string } },
  { limit: number }
> = async ({ series, season }, { limit }, { dataSources }, info) => {
  const results = await dataSources.MovieDB.seasonCredits(
    { show: series.id, season: season.season_number },
    info
  );
  return results.cast.slice(0, limit ? limit : results.cast.length) || [];
};

export const crew: Resolver<
  {
    series: { id: string };
    // eslint-disable-next-line camelcase
    season: { season_number: string };
    // eslint-disable-next-line camelcase
    episode_number: string;
  },
  { limit: number }
> = async (
  { series, season, episode_number: episode },
  { limit },
  { dataSources },
  info
) => {
  const results = await dataSources.MovieDB.episodeCredits(
    { show: series.id, season: season.season_number, episode },
    info
  );
  return (
    Object.values(
      results.crew.reduce(
        (
          hash: Record<any, any>,
          { id, job, ...rest }: { id: string; job: string }
        ) => {
          if (hash[id]) {
            hash[id].job.push(job);
          } else {
            hash[id] = { job: [job], ...rest };
          }
          return hash;
        },
        Object.create(null)
      )
    ).slice(0, limit ? limit : results.crew.length) || []
  );
};

export const guests: Resolver<
  {
    series: { id: string };
    // eslint-disable-next-line camelcase
    season: { season_number: string };
    // eslint-disable-next-line camelcase
    episode_number: string;
  },
  { limit: number }
> = async (
  { series, season, episode_number: episode },
  { limit },
  { dataSources },
  info
) => {
  const results = await dataSources.MovieDB.episodeCredits(
    { show: series.id, season: season.season_number, episode },
    info
  );
  return results.cast.slice(0, limit ? limit : results.cast.length) || [];
};
