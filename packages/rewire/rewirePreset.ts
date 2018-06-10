import presetReactApp from "babel-preset-react-app";
import presetTypeScript from "@babel/preset-typescript";
import transformTypeScript from "@babel/plugin-transform-typescript";

const removeFlowPreset = (...args: any[]) => {
  // Pass along arguments to babel-preset-react-app and generate its preset.
  const preset = presetReactApp(...args);

  // Remove the Flow preset.
  preset.presets = preset.presets.filter(
    p => !babelPluginTransformFlowDetectionHack(p)
  );

  // Add the TypeScript preset if we have a compatible Babel beta version, see
  // the docs for "doesBabelSupportOverridesFeature".
  const overridesSupported = doesBabelSupportOverridesFeature(args[0].version);
  if (overridesSupported) {
    preset.presets.push(presetTypeScript);
  } else {
    preset.presets.push({
      plugins: [transformTypeScript]
    });
  }

  return preset;
};

export default removeFlowPreset;

/**
 * Babel 7 beta versions 48 and above make use of an "overrides" field to
 * provide Webpack like selective loading of plugins and options. This allows
 * later versions to do things like disable the Flow transform automatically,
 * etc.
 *
 * If we attempt to pass this new field to an older Babel version, we get an
 * error because that field is unexpected.
 *
 * This should be removed when Babel 7 stable is released.
 *
 * @see https://github.com/babel/babel/commit/43aa61d6bedfe0025ceb2f5f3512b3c66bc6c604#diff-a31d321b4911bbbc31e1d19a726637c6
 */
const doesBabelSupportOverridesFeature = (babelVersion: string): boolean => {
  // "v7.0.0-beta.48" -> "48"
  const babelBetaVersionMatch = /^v?7\.0\.0-beta\.(\d+)/.exec(babelVersion);
  if (babelBetaVersionMatch === null) return true;

  // "48" -> 48
  let babelBetaVersion: number;
  try {
    babelBetaVersion = parseInt(babelBetaVersionMatch[1], 10);
  } catch {
    return true;
  }

  return babelBetaVersion > 47;
};

/**
 * Different versions of Babel 7 behave differently when it comes to supplying
 * presets. Later versions wrap imported presets in a function that performs
 * a Babel version check. As a result, we can not do a string comparison to
 * determine if the supplied preset is the Flow plugin using the function name.
 *
 * Later versions of babel-preset-react-app have an option to disable the Flow
 * plugin. To remain compatible with older react-scripts 2 beta versions, we do
 * not use that feature. When react-scripts 2 is officially released, this hack
 * should be removed.
 *
 * @see https://github.com/facebook/create-react-app/tree/next/packages/babel-preset-react-app#usage-with-typescript
 * @see https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-flow-strip-types
 */
const babelPluginTransformFlowDetectionHack = (preset: any): boolean => {
  /* tslint:disable-next-line:no-var-requires */
  const babel: any = require("@babel/core");

  try {
    const transformedCode = babel.transform(
      `function foo(one: any, two: number, three?): string {}`,
      {
        presets: [preset]
      }
    );
    return !transformedCode.code!.includes("string");
  } catch {
    return false;
  }
};
