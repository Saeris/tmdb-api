export const discoverMovies = `query DiscoverMovies {
  discoverMovies(filter: { year: 1999, withCast: { include: [819] } }) {
    id
    name
    overview
    releaseDate
    poster {
      large
    }
  }
}
`
