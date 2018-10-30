export { gender } from "./gender"

export const appearsIn = async ({ combined_credits: credits }, { limit }, { dataSources }, info) => {
  const roles = credits.cast.slice(0, limit ? limit : credits.cast.length) || []
  const resolved = await Promise.all([
    Promise.all(roles
      .filter(({ media_type: type }) => type === `movie`)
      .map(({ id }) => dataSources.MovieDB.movie({ id }, info))),
    Promise.all(roles
      .filter(({ media_type: type }) => type === `tv`)
      .map(({ id }) => dataSources.MovieDB.tv({ id }, info)))
  ])
  return [
    ...resolved[0].map(movie => ({ ...movie, media_type: `movie` })),
    ...resolved[1].map(show => ({ ...show, media_type: `tv` }))
  ]
}

export const workedOn = async ({ combined_credits: credits }, { limit }, { dataSources }, info) => {
  const roles = credits.crew.slice(0, limit ? limit : credits.crew.length) || []
  const resolved = await Promise.all([
    Promise.all(roles
      .filter(({ media_type: type }) => type === `movie`)
      .map(({ id }) => dataSources.MovieDB.movie({ id }, info))),
    Promise.all(roles
      .filter(({ media_type: type }) => type === `tv`)
      .map(({ id }) => dataSources.MovieDB.tv({ id }, info)))
  ])
  return [
    ...resolved[0].map(movie => ({ ...movie, media_type: `movie` })),
    ...resolved[1].map(show => ({ ...show, media_type: `tv` }))
  ]
}

export const photo = parent => parent.profile_path
