const {
  rewireWebpack: rewireTypescript,
  rewireJest: rewireTypescriptJest,
  rewireTSLint
} = require("react-app-rewire-typescript-babel-preset");
// const {
//   rewireWebpack: rewireTypescript,
//   rewireJest: rewireTypescriptJest
// } = require("../dist");

module.exports = {
  webpack: function(config, env) {
    config = rewireTypescript(config);
    config = rewireTSLint(config);

    return config;
  },
  jest: function(config) {
    return rewireTypescriptJest(config);
  }
};
