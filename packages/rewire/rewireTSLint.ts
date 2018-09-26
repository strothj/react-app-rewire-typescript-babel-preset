import * as webpack from "webpack";
import { getLoader, Matcher } from "react-app-rewired";
import { getValidatedConfig } from "./webpackUtils";

export default function(
  c: webpack.Configuration,
  options?: object
): webpack.Configuration {
  // Validate and narrow type
  const config = getValidatedConfig(c);

  // Grab the current ESLint config so we can copy some of its settings
  const esLintLoader = getLoader(config.module.rules, esLintLoaderMatcher);

  if (!esLintLoader) {
    throw new Error("Could not locate eslint-loader.");
  }

  // Create a new rule
  const tsLintLoader: webpack.RuleSetRule = {
    test: /\.(ts|tsx)$/,
    enforce: "pre",
    use: [
      {
        options,
        loader: require.resolve("tslint-loader")
      }
    ],
    include: esLintLoader.include,
    exclude: esLintLoader.exclude
  };

  config.module.rules.unshift(tsLintLoader);

  return config;
}

const esLintLoaderMatcher: Matcher = rule =>
  Boolean(
    rule.test &&
      // TODO: Remove the rule regex test that includes the JavaScript modules
      // extension. Versions prior to 2.0.0-next.fb6e6f70 included support for
      // JavaScript modules.
      (rule.test.toString() === /\.(js|jsx|mjs)$/.toString() ||
        rule.test.toString() === /\.(js|jsx)$/.toString()) &&
      Array.isArray(rule.use) &&
      rule.use.find((r: any) => r.loader && /eslint-loader/.test(r.loader))
  );
