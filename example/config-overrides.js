// const rewireTypescript = require("react-app-rewire-typescript-babel-preset");
const rewireTypescript = require("../");

module.exports = function override(baseConfig, env) {
  let config = baseConfig;

  config = rewireTypescript(config, env);

  return config;
};
