import path from "path";
import * as webpack from "webpack";
import reactScriptsPaths from "react-scripts/config/paths";
import { getLoader, Matcher } from "react-app-rewired";
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

  // TODO: Remove this after beta. Special handling for pre-2.0.0-next.fb6e6f70.
  // JavaScript modules were supported in prior versions, so we need to take
  // the additional file extension into account.
  let scriptLoader = getLoader(
    config.module.rules,
    scriptsLoaderMatcher__PRE__fb6e6f70
  );
  if (scriptLoader) {
    scriptLoader.test = /\.(ts|tsx|js|jsx|mjs)$/;
  }
  // This will become the default handling after beta.
  if (!scriptLoader) {
    scriptLoader = getLoader(config.module.rules, scriptsLoaderMatcher);
    if (!scriptLoader) throw new Error("Unable to locate scripts loader.");
    scriptLoader.test = /\.(ts|tsx|js|jsx)$/;
  }

  // Replace the babel-preset-react-app preset with the preset rewire from this
  // package. This is done so @babel/preset-flow can be removed.
  // const babelLoader = getBabelLoader(config.module.rules) as webpack.NewLoader;
  const babelLoader = getLoader(
    scriptLoader.use as webpack.RuleSetRule[],
    babelLoaderMatcher
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
    if (typeof svgBabelLoader.options === "string")
      throw new Error("Unexpected layout for SVG loader.");
    svgBabelLoader.options.presets = babelLoader.options.presets;
  }

  return config;
}

// Matcher to find JavaScript/JSX loader using getLoader util from
// react-app-rewired. We need to able to locate the script loader to change the
// regular expression for its file name matching.
//
// TODO: Remove this after beta. Versions of react-scripts before
// 2.0.0-next.fb6e6f70 supported JavaScript modules.
const scriptsLoaderMatcher__PRE__fb6e6f70: Matcher = rule =>
  Boolean(
    rule.test &&
      rule.test.toString() === /\.(js|jsx|mjs)$/.toString() &&
      Array.isArray(rule.use) &&
      rule.use.find((r: any) => r.loader && /babel-loader/.test(r.loader))
  );

// Matcher to find JavaScript/JSX loader using getLoader util from
// react-app-rewired. We need to able to locate the script loader to change the
// regular expression for its file name matching.
const scriptsLoaderMatcher: Matcher = rule =>
  Boolean(
    rule.test &&
      rule.test.toString() === /\.(js|jsx)$/.toString() &&
      Array.isArray(rule.use) &&
      rule.use.find(
        (r: any) =>
          r.loader &&
          (/babel-loader/.test(r.loader) ||
            // TODO: Remove this. Build 2.0.0-next.fb6e6f70 contains the use of
            // a custom loader. react-scripts developers are waiting for
            // customization support in babel-loader.
            /babel-preset-react-app.loader/.test(r.loader))
      )
  );

const babelLoaderMatcher: Matcher = rule =>
  Boolean(
    typeof rule.loader === "string" &&
      (/babel-loader/.test(rule.loader) ||
        /babel-preset-react-app.loader/.test(rule.loader))
  );

// The SVG loader will also need adjusting due to its use of the same preset as
// mentioned above.
const svgLoaderMatcher: Matcher = rule =>
  Boolean(
    rule.test &&
      rule.test.toString() === /\.svg$/.toString() &&
      Array.isArray(rule.use) &&
      rule.use &&
      rule.use.find((r: any) => r.loader && /babel-loader/.test(r.loader))
  );
