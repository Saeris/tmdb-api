const core = require(`./webpack.core`)
const Dotenv = require(`dotenv-webpack`)
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")

module.exports = {
  ...core,
  plugins: [
    new Dotenv(),
    ...(process.env.NODE_ENV === `production`
      ? [
          //new BundleAnalyzerPlugin()
        ]
      : [])
  ]
}
