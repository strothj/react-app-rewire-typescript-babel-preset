import * as webpack from "webpack";

interface ReactScriptsConfig extends webpack.Configuration {
  resolve: {
    extensions: string[];
  };
  module: {
    rules: webpack.Rule[];
  };
}

export function getValidatedConfig(
  config: webpack.Configuration
): ReactScriptsConfig {
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
