const core = require(`./webpack.core`);
const Dotenv = require(`dotenv-webpack`);

module.exports = {
  ...core,
  plugins: [new Dotenv()]
};
