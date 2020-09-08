export const trending = `query Trending {
  trending(timeframe: Day) {
    ... on Movie {
      id
      name
      overview
    }
    ... on TV {
      id
      name
      overview
    }
    ... on Person {
      id
      name
      biography
    }
  }
}`
