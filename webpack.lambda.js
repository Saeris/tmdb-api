const { join } = require(`path`)
const slsw = require(`serverless-webpack`) // https://github.com/serverless-heaven/serverless-webpack
const core = require(`./webpack.core`)

module.exports = {
  ...core,
  mode: slsw.lib.webpack.isLocal ? `development` : `production`,
  entry: slsw.lib.entries,
  target: `node`,
  output: {
    libraryTarget: `commonjs`,
    path: join(__dirname, `.webpack`),
    filename: `[name].js`,
    sourceMapFilename: `[file].map`
  }
}
