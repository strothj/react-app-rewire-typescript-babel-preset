// const rewireTypescript = require("react-app-rewire-typescript-babel-preset");
const {
  rewireWebpack: rewireTypescript,
  rewireJest: rewireTypescriptJest
} = require("../");

module.exports = {
  webpack: function(config, env) {
    return rewireTypescript(config);
  },
  jest: function(config) {
    return rewireTypescriptJest(config);
  }
};
