import path from "path";
import * as webpack from "webpack";
import reactScriptsPaths from "react-scripts/config/paths";
import { getBabelLoader, getLoader, Matcher } from "react-app-rewired";

// Switch out the entry point index.js for index.tsx.
// We need to do this on module import to intercept react-script's preflight
// module check.
reactScriptsPaths.appIndexJs = reactScriptsPaths.appIndexJs.replace(
  /src[\\\/]index.js$/,
  `src${path.sep}index.tsx`
);

export type CreateRewireWebpack = (
  options: { tsExtHighPriority: boolean }
) => RewireWebpack;

export type RewireWebpack = (c: webpack.Configuration) => webpack.Configuration;

export interface RewireWebpackWithOptions extends RewireWebpack {
  withOptions?: CreateRewireWebpack;
}

const rewireWebpack = createRewireWebpack();
(rewireWebpack as RewireWebpackWithOptions).withOptions = createRewireWebpack;

export default rewireWebpack;

function createRewireWebpack(options = { tsExtHighPriority: false }) {
  return (c => {
    // Validate and narrow type
    const config = getValidatedConfig(c);

    const arrAddFn = options.tsExtHighPriority ? "unshift" : "push";
    config.resolve.extensions[arrAddFn](".web.ts", ".web.tsx", ".ts", ".tsx");

    // Locate the Webpack loader responsible for handling Javascript assets and
    // add TypeScript file extensions.
    const scriptLoader = getLoader(config.module.rules, scriptsLoaderMatcher);
    if (!scriptLoader) throw new Error("Unable to locate scripts loader.");
    scriptLoader.test = /\.(ts|tsx|js|jsx|mjs)$/;

    // Replace the babel-preset-react-app preset with the preset rewire from this
    // package. This is done so @babel/preset-flow can be removed.
    const babelLoader = getBabelLoader(
      config.module.rules
    ) as webpack.NewLoader;
    if (!babelLoader || !babelLoader.options)
      throw new Error("Unable to locate Babel loader.");
    babelLoader.options.presets = [path.resolve(__dirname, "rewirePreset")];

    // Older versions of react-scripts v2 use a Webpack loader to add support for
    // SVGs as React components. Later versions do this using a Babel plugin.
    // Check if it is present. If it is, replace the preset in the SVG loader's
    // sibling Babel loader.
    const svgLoader = getLoader(config.module.rules, svgLoaderMatcher);
    if (svgLoader) {
      if (!("use" in svgLoader) || !Array.isArray(svgLoader.use))
        throw new Error("Unexpected layout for SVG loader.");
      const svgBabelLoader = svgLoader.use.find((l: any) =>
        /babel-loader/.test(l.loader)
      );
      if (
        !svgBabelLoader ||
        typeof svgBabelLoader !== "object" ||
        !("options" in svgBabelLoader) ||
        svgBabelLoader.options == null
      )
        throw new Error("Unable to locate sibling Babel loader in SVG loader.");
      svgBabelLoader.options.presets = babelLoader.options.presets;
    }

    return config;
  }) as RewireWebpack;
}

// Matcher to find JavaScript/JSX loader using getLoader util from
// react-app-rewired. We need to able to locate the script loader to change the
// regular expression for its file name matching.
const scriptsLoaderMatcher: Matcher = rule =>
  rule.test &&
  rule.test.toString() === /\.(js|jsx|mjs)$/.toString() &&
  "use" in rule &&
  Array.isArray(rule.use) &&
  rule.use.find((r: any) => r.loader && /babel-loader/.test(r.loader));

// The SVG loader will also need adjusting due to its use of the same preset as
// mentioned above.
const svgLoaderMatcher: Matcher = rule =>
  rule.test &&
  rule.test.toString() === /\.svg$/.toString() &&
  "use" in rule &&
  Array.isArray(rule.use) &&
  rule.use &&
  rule.use.find((r: any) => r.loader && /babel-loader/.test(r.loader));

interface ReactScriptsConfig extends webpack.Configuration {
  resolve: {
    extensions: string[];
  };
  module: {
    rules: webpack.Rule[];
  };
}

function getValidatedConfig(config: webpack.Configuration): ReactScriptsConfig {
  let error: string | undefined;

  const matchesShape = (c: webpack.Configuration): c is ReactScriptsConfig => {
    error = (() => {
      if (!c.resolve) return "resolve is undefined";
      if (!c.resolve.extensions) return "resolve.extensions is undefined";
      if (!c.module) return "module is undefined";
      return undefined;
    })();

    return error === undefined;
  };

  if (matchesShape(config)) return config;
  throw new Error(`Unexpected Webpack config shape: ${error}.`);
}
