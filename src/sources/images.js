export class Images {
  baseURL = `https://image.tmdb.org/t/p/`

  original = id => `${this.baseURL}original${id}`

  custom = (id, dimensions) => `${this.baseURL}${dimensions}${id}`

  w45 = id => `${this.baseURL}w45${id}`
  w92 = id => `${this.baseURL}w92${id}`
  w154 = id => `${this.baseURL}w154${id}`
  w185 = id => `${this.baseURL}w185${id}`
  w300 = id => `${this.baseURL}w300${id}`
  w342 = id => `${this.baseURL}w342${id}`
  w500 = id => `${this.baseURL}w500${id}`
  w780 = id => `${this.baseURL}w780${id}`
  w1280 = id => `${this.baseURL}w1280${id}`

  h632 = id => `${this.baseURL}h632${id}`
}
