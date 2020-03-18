export const defaultQuery = `query fetchPopular($page: Int!) {
    movies: popularMovies(page: $page) {
      id
      title
      overview
      releaseDate
      img: poster {
        url: custom(size: "w185_and_h278_bestv2")
      }
    }
  }`
