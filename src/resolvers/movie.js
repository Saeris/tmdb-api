import { filterResults } from "../utils"

export const status = (parent, args, context) => parent.status.replace(/\s/g, ``)

export const cast = ({ credits }, { limit }) => credits.cast.slice(0, limit ? limit : credits.cast.length) || []

export const crew = ({ credits }, { limit }) => Object.values(credits.crew.reduce((hash, { id, job, ...rest }) => {
  if (hash[id]) {
    hash[id].job.push(job)
  } else {
    hash[id] = { job: [job], ...rest }
  }
  return hash
}, Object.create(null))).slice(0, limit ? limit : credits.crew.length) || []

export const similar = ({ similar: { results } }, { limit }) => results.slice(0, limit ? limit : results.length) || []

export const videos = ({ videos: { results } }, { filter = {} }) => results.filter(filterResults, filter) || []

export const score = parent => parent.vote_average

export const votes = parent => parent.vote_count

export const languages = parent => parent.spoken_languages

export const releaseDate = parent => parent.release_date

export const backdrop = parent => parent.backdrop_path

export const poster = parent => parent.poster_path
