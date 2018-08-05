export const poster = parent => parent.poster_path

export const aired = parent => parent.air_date

export const number = parent => parent.season_number

export const episodeCount = parent => parent.episodes.length

export const episodes = async (parent, _, { dataSources }, info) => {
  const results = await Promise.all(
    parent.episodes.map(({ episode_number: episode }) =>
      dataSources.MovieDB.episode({ show: parent.series.id, season: parent.season_number, episode }, info))
  )
  return results
    .reduce((list, season) => ([...list, season]), [])
    .map(episode => ({ ...episode, series: parent.series, season: parent }))
}
