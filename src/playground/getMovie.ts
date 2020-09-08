export const getMovie = `query getMovie {
  movie(id: 550) {
    id
    name
    overview
    cast(limit: 5) {
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
    crew(limit: 5) {
      id
      person {
        name
      }
      role {
        ... on Crew {
          job
          department
        }
      }
    }
  }
}`
