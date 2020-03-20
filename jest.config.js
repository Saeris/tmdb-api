module.exports = {
  displayName: `mini-movie-db-api`,
  coverageDirectory: `./coverage/`,
  collectCoverage: true,
  transform: {
    "\\.(gql|graphql)$": `jest-transform-graphql`,
    "^.+\\.(js|ts)x?$": `babel-jest`
  },
  verbose: true
}
