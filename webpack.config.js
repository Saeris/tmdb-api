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
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: `babel-loader`,
        exclude: /node_modules/,
        options: {
          babelrc: false,
          cacheDirectory: true,
          plugins: [
            require(`@babel/plugin-transform-runtime`),

            // Stage 1
            [require(`@babel/plugin-proposal-optional-chaining`), { loose: false }],
            [require(`@babel/plugin-proposal-pipeline-operator`), { proposal: `minimal` }],
            [require(`@babel/plugin-proposal-nullish-coalescing-operator`), { loose: false }],

            // Stage 2
            [require(`@babel/plugin-proposal-decorators`), { legacy: true }],
            require(`@babel/plugin-proposal-export-namespace-from`),

            // Stage 3
            [require(`@babel/plugin-proposal-class-properties`), { loose: false }]
          ],
          presets: [[require(`@babel/preset-env`), { targets: { node: `8.10` } }]]
        }
      },
      { test: /\.(graphql|gql)$/, exclude: /node_modules/, loader: `graphql-tag/loader` }
    ]
  }
}
