export const number = parent => parent.episode_number

export const still = parent => parent.still_path

export const aired = parent => parent.air_date

export const score = parent => parent.vote_average

export const votes = parent => parent.vote_count

export const cast = async ({ series, season }, { limit }, { dataSources }, info) => {
  const results = await dataSources.MovieDB.seasonCredits({ show: series.id, season: season.season_number }, info)
  return results.cast.slice(0, limit ? limit : results.cast.length) || []
}

export const crew = async ({ series, season, episode_number: episode }, { limit }, { dataSources }, info) => {
  const results = await dataSources.MovieDB.episodeCredits({ show: series.id, season: season.season_number, episode }, info)
  return Object.values(results.crew.reduce((hash, { id, job, ...rest }) => {
    if (hash[id]) {
      hash[id].job.push(job)
    } else {
      hash[id] = { job: [job], ...rest }
    }
    return hash
  }, Object.create(null))).slice(0, limit ? limit : results.crew.length) || []
}

export const guests = async ({ series, season, episode_number: episode }, { limit }, { dataSources }, info) => {
  const results = await dataSources.MovieDB.episodeCredits({ show: series.id, season: season.season_number, episode }, info)
  return results.cast.slice(0, limit ? limit : results.cast.length) || []
}
