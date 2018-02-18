import path from "path";
import resolveProjectDirectory from "./resolveProjectDirectory";

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

const babelJestPath = path.resolve(projectDirectory, "node_modules/babel-jest");

/* tslint:disable-next-line */
const reactScriptsPathsModule = require(reactScriptsPathsModulePath);

/* tslint:disable-next-line */
const reactAppRequired = require(reactAppRewiredModulePath);

/* tslint:disable-next-line */
const presetReactApp = require(presetReactAppPath);

/* tslint:disable-next-line */
const babelJest = require(babelJestPath);

export { reactScriptsPathsModule, reactAppRequired, presetReactApp, babelJest };
