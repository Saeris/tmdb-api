const mapResultsToMovies = (results, dataSources, info) => Promise.all(results.map(({ id }) => dataSources.MovieDB.movie({ id }, info)))
const mapResultsToPeople = (results, dataSources, info) => Promise.all(results.map(({ id }) => dataSources.MovieDB.person({ id }, info)))
const mapResultsToShows = (results, dataSources, info) => Promise.all(results.map(({ id }) => dataSources.MovieDB.tv({ id }, info)))

export const movie = (parent, { id }, { dataSources }, info) => dataSources.MovieDB.movie({ id }, info)

export const person = (parent, { id }, { dataSources }, info) => dataSources.MovieDB.person({ id }, info)

export const tv = (parent, { id }, { dataSources }, info) => dataSources.MovieDB.tv({ id }, info)

export const popularMovies = async (parent, { page = 1 }, { dataSources }, info) => {
  const { results } = await dataSources.MovieDB.popularMovies({ page }, info)
  return mapResultsToMovies(results, dataSources, info)
}

export const popularPeople = async (parent, { page = 1 }, { dataSources }, info) => {
  const { results } = await dataSources.MovieDB.popularPeople({ page }, info)
  return mapResultsToPeople(results, dataSources, info)
}

export const popularTV = async (parent, { page = 1 }, { dataSources }, info) => {
  const { results } = await dataSources.MovieDB.popularTV({ page }, info)
  return mapResultsToShows(results, dataSources, info)
}

export const search = async (parent, { query = ``, page = 1 }, { dataSources }, info) => {
  const { results } = await dataSources.MovieDB.search({ query, page }, info)
  const resolved = await Promise.all([
    mapResultsToMovies(results.filter(result => result.media_type === `movie`), dataSources, info),
    mapResultsToPeople(results.filter(result => !result.media_type), dataSources, info),
    mapResultsToShows(results.filter(result => result.media_type === `tv`), dataSources, info)
  ])
  return [
    ...resolved[0].map(movie => ({ ...movie, media_type: `movie` })), // eslint-disable-line
    ...resolved[1],
    ...resolved[2].map(show => ({ ...show, media_type: `tv` }))
  ]
}

export const searchMovies = async (parent, { query = ``, page = 1 }, { dataSources }, info) => {
  const { results } = await dataSources.MovieDB.searchMovies({ query, page }, info)
  return mapResultsToMovies(results, dataSources, info)
}

export const searchPeople = async (parent, { query = ``, page = 1 }, { dataSources }, info) => {
  const { results } = await dataSources.MovieDB.searchPeople({ query, page }, info)
  return mapResultsToPeople(results, dataSources, info)
}

export const searchTV = async (parent, { query = ``, page = 1 }, { dataSources }, info) => {
  const { results } = await dataSources.MovieDB.searchTVShows({ query, page }, info)
  return mapResultsToShows(results, dataSources, info)
}

export const nowPlaying = async (parent, { page = 1 }, { dataSources }, info) => {
  const { results } = await dataSources.MovieDB.nowPlaying({ page }, info)
  return mapResultsToMovies(results, dataSources, info)
}

export const topRatedMovies = async (parent, { page = 1 }, { dataSources }, info) => {
  const { results } = await dataSources.MovieDB.topRatedMovies({ page }, info)
  return mapResultsToMovies(results, dataSources, info)
}

export const upcomingMovies = async (parent, { page = 1 }, { dataSources }, info) => {
  const { results } = await dataSources.MovieDB.upcomingMovies({ page }, info)
  return mapResultsToMovies(results, dataSources, info)
}

export const airingThisWeek = async (parent, { page = 1 }, { dataSources }, info) => {
  const { results } = await dataSources.MovieDB.airingThisWeek({ page }, info)
  return mapResultsToMovies(results, dataSources, info)
}

export const airingToday = async (parent, { page = 1 }, { dataSources }, info) => {
  const { results } = await dataSources.MovieDB.airingToday({ page }, info)
  return mapResultsToMovies(results, dataSources, info)
}

export const topRatedTV = async (parent, { page = 1 }, { dataSources }, info) => {
  const { results } = await dataSources.MovieDB.topRatedTV({ page }, info)
  return mapResultsToMovies(results, dataSources, info)
}
