export { gender } from "./gender"

export const appearsIn = async ({ id }, { limit }, { dataSources }, info) => {
  const { cast } = await dataSources.MovieDB.personCredits({ id }, info)
  const roles = cast.slice(0, limit ? limit : cast.length) || []
  const movies = await Promise.all(roles.map(({ id: movieId }) => dataSources.MovieDB.movie({ id: movieId }, info)))
  return movies
}

export const workedOn = async ({ id }, { limit }, { dataSources }, info) => {
  const { crew } = await dataSources.MovieDB.personCredits({ id }, info)
  const roles = crew.slice(0, limit ? limit : crew.length) || []
  const movies = await Promise.all(roles.map(({ id: movieId }) => dataSources.MovieDB.movie({ id: movieId }, info)))
  return movies
}

export const photo = parent => parent.profile_path
