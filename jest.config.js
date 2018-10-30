module.exports = {
  coverageDirectory: `./coverage/`,
  collectCoverage: true,
  transform: {
    "\\.(gql|graphql)$": `jest-transform-graphql`,
    "^.+\\.js$": `babel-jest`
  },
  verbose: true
}
