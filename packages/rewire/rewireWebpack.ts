import path from "path";
import * as webpack from "webpack";
import reactScriptsPaths from "react-scripts/config/paths";
import { getLoader, Matcher, getBabelLoader } from "react-app-rewired";
import { getValidatedConfig } from "./webpackUtils";

// Switch out the entry point index.js for index.tsx.
// We need to do this on module import to intercept react-script's preflight
// module check.
reactScriptsPaths.appIndexJs = reactScriptsPaths.appIndexJs.replace(
  /src[\\\/]index.js$/,
  `src${path.sep}index.tsx`
);

export default function(c: webpack.Configuration): webpack.Configuration {
  // Validate and narrow type
  const config = getValidatedConfig(c);

  config.resolve.extensions.unshift(".web.ts", ".web.tsx", ".ts", ".tsx");

  // Locate the Webpack loader responsible for handling Javascript assets and
  // add TypeScript file extensions.
  const scriptLoader = getLoader(config.module.rules, scriptsLoaderMatcher);
  if (!scriptLoader) throw new Error("Unable to locate scripts loader.");
  scriptLoader.test = /\.(ts|tsx|js|jsx)$/;

  // Replace the babel-preset-react-app preset with the preset rewire from this
  // package. This is done so @babel/preset-flow can be removed.
  const babelLoader = getBabelLoader(config.module.rules) as webpack.NewLoader;
  if (!babelLoader || !babelLoader.options)
    throw new Error("Unable to locate Babel loader.");
  babelLoader.options.presets = [path.resolve(__dirname, "rewirePreset")];

  return config;
}

// Matcher to find JavaScript/JSX loader using getLoader util from
// react-app-rewired. We need to able to locate the script loader to change the
// regular expression for its file name matching.
const scriptsLoaderMatcher: Matcher = rule => {
  return Boolean(
    rule.test &&
      rule.test.toString() === /\.(js|jsx)$/.toString() &&
      rule.enforce !== "pre" &&
      typeof rule.loader === "string" &&
      /babel-loader/.test(rule.loader)
  );
};
