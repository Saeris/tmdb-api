export const searchMovies = `query SearchMovies {
  searchMovies(query: "fight club") {
    id
    name
    overview
    releaseDate
    cast {
      id
      person {
        name
      }
      role {
        ... on Cast {
          character
        }
      }
    }
  }
}` as const
