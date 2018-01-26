/* eslint-disable import/no-dynamic-require */

const path = require("path");
const resolveProjectDirectory = require("./resolveProjectDirectory");

const projectDirectory = resolveProjectDirectory();

// Resolve path to react-app-rewired module. We resolve it relative to the
// project root directory to allow it to function during testing from the
// example directory. Example project includes this project using a relative
// require (..).
const reactAppRewiredModulePath = path.resolve(
  projectDirectory,
  "node_modules/react-app-rewired"
);

const reactScriptsPathsModulePath = path.resolve(
  projectDirectory,
  "node_modules/react-scripts/config/paths"
);

const presetReactAppPath = path.resolve(
  projectDirectory,
  "node_modules/babel-preset-react-app"
);

const reactScriptsPathsModule = require(reactScriptsPathsModulePath);

const reactAppRequired = require(reactAppRewiredModulePath);

const presetReactApp = require(presetReactAppPath);

module.exports = {
  reactScriptsPathsModule,
  reactAppRequired,
  presetReactApp
};
