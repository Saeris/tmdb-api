import { Resolver } from "./shared";

export const poster = (parent: Record<string, string>) => parent.poster_path;

export const aired = (parent: Record<string, string>) => parent.air_date;

export const number = (parent: Record<string, string>) => parent.season_number;

export const episodeCount = (parent: Record<string, string>) =>
  parent.episodes.length;

export const episodes: Resolver<{
  // eslint-disable-next-line camelcase
  episodes: { episode_number: string }[];
  series: { id: string };
  // eslint-disable-next-line camelcase
  season_number: string;
}> = async (parent, _, { dataSources }, info) => {
  const results = await Promise.all(
    parent.episodes.map(({ episode_number: episode }) =>
      dataSources.MovieDB.episode(
        { show: parent.series.id, season: parent.season_number, episode },
        info
      )
    )
  );
  return results
    .reduce((list, season) => [...list, season], [])
    .map((episode: Record<any, any>) => ({
      ...episode,
      series: parent.series,
      season: parent
    }));
};
