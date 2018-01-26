const wrapError = require("./wrapError");

/**
 * Resolve the project directory using hints from the module cache.
 *
 * During react-scripts execution, react-scripts is loaded into the module
 * cache. During Webpack's loading of the Babel loader, @babel modules will be
 * available.
 *
 * We determine the project directory using the module cache to allow for easier
 * testing from the project in the example directory.
 */
const resolveProjectDirectory = () => {
  // The [\\/] pattern says to match backslashes or forward slashes (to support
  // detection on Windows).
  const moduleCacheKeyTargetRegex = /[\\/]node_modules[\\/](@babel|react-scripts)[\\/]/;

  const matchedModuleKey = Object.keys(require.cache).find(key =>
    moduleCacheKeyTargetRegex.test(key)
  );

  if (!matchedModuleKey)
    throw new Error(wrapError("Unable to resolve project directory."));

  // Grab everything before node_modules and the trailing path separator.
  const match = moduleCacheKeyTargetRegex.exec(matchedModuleKey);
  const projectDirectory = matchedModuleKey.substring(0, match.index);

  return projectDirectory;
};

module.exports = resolveProjectDirectory;
