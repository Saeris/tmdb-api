const nodeExternals = require(`webpack-node-externals`) // https://github.com/liady/webpack-node-externals

module.exports = {
  target: "node",
  externals: [nodeExternals()],
  ...(process.env.NODE_ENV === `production`
    ? {
        mode: `production`
      }
    : {
        mode: `development`,
        devtool: `inline-source-map`,
        optimization: { minimize: false },
        stats: {
          colors: true,
          reasons: false,
          chunks: false
        },
        performance: {
          hints: false
        }
      }),
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
