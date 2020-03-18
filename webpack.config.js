const { join } = require(`path`)
const slsw = require(`serverless-webpack`) // https://github.com/serverless-heaven/serverless-webpack
const nodeExternals = require(`webpack-node-externals`) // https://github.com/liady/webpack-node-externals

module.exports = {
  mode: slsw.lib.webpack.isLocal ? `development` : `production`,
  entry: slsw.lib.entries,
  target: `node`,
  externals: [nodeExternals()],
  devtool: `nosources-source-map`,
  output: {
    libraryTarget: `commonjs`,
    path: join(__dirname, `.webpack`),
    filename: `[name].js`,
    sourceMapFilename: `[file].map`
  },
  stats: {
    colors: true,
    reasons: false,
    chunks: false
  },
  performance: {
    hints: false
  },
  optimization: {
    minimize: false
  },
  resolve: {
    extensions: [`.ts`, `.js`]
  },
  module: {
    rules: [
      {
        test: /\.(m?js|ts)$/,
        loader: `babel-loader`,
        exclude: /node_modules/
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: `graphql-tag/loader`
      }
    ]
  }
}
