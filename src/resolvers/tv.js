import { filterResults } from "../utils"

export const poster = parent => parent.poster_path

export const backdrop = parent => parent.backdrop_path

export const videos = ({ videos: { results } }, { filter }) => results.filter(filterResults, filter) || []

export const type = parent => parent.type.replace(/\s/g, ``)

export const status = parent => parent.status.replace(/\s/g, ``)

export const createdBy = (parent, _, { dataSources }, info) => Promise.all(
  parent.created_by.map(({ id }) => dataSources.MovieDB.person({ id }, info))
)

export const cast = ({ credits }, { limit }) => credits.cast.slice(0, limit ? limit : cast.length) || []

export const crew = ({ credits }, { limit }) => Object.values(credits.crew.reduce((hash, { id, job, ...rest }) => {
  if (hash[id]) {
    hash[id].job.push(job)
  } else {
    hash[id] = { job: [job], ...rest }
  }
  return hash
}, Object.create(null))).slice(0, limit ? limit : credits.crew.length) || []

export const networks = (parent, _, { dataSources }, info) => Promise.all(
  parent.networks.map(({ id }) => dataSources.MovieDB.network({ id }, info))
)

export const productionCompanies = (parent, _, { dataSources }, info) => Promise.all(
  parent.production_companies.map(({ id }) => dataSources.MovieDB.company({ id }, info))
)

export const seasonCount = parent => parent.number_of_seasons

export const seasons = async (parent, _, { dataSources }, info) => {
  const results = await Promise.all(
    parent.seasons.map(({ season_number: season }) => dataSources.MovieDB.season({ show: parent.id, season }, info))
  )
  return results.map(season => ({ ...season, series: parent }))
}

export const episodeCount = parent => parent.number_of_episodes

export const episodes = async (parent, _, { dataSources }, info) => {
  const fetchedSeasons = await Promise.all(
    parent.seasons.map(({ id: season }) => dataSources.MovieDB.season({ show: parent.id, season }, info))
  )
  const results = await Promise.all(
    fetchedSeasons.map(({ season_number: season, episodes: eps }) =>
      eps.map(({ episode_number: episode }) => dataSources.MovieDB.episode({ show: parent.id, season, episode }, info)))
  )
  return results.reduce((list, season) => ([...list, ...season]), []).map(episode => ({ ...episode, series: parent }))
}

export const country = parent => parent.origin_country

export const language = parent => parent.original_language

export const originalName = parent => parent.original_name

export const similar = ({ similar: { results } }, { limit }) => results.slice(0, limit ? limit : results.length) || []

export const score = parent => parent.vote_average

export const votes = parent => parent.vote_count

export const inProduction = parent => parent.in_production
export const firstAired = parent => parent.first_air_date
export const lastAired = parent => parent.last_air_date
export const runtime = parent => parent.episode_run_time
