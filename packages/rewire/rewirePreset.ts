import presetReactApp from "babel-preset-react-app";

const removeFlowPreset = (...args: any[]) => {
  // Pass along arguments to babel-preset-react-app and generate its preset.
  const preset = presetReactApp(...args);

  // Replace the Flow preset with TypeScript.
  preset.presets = preset.presets.filter(
    p => !babelPluginTransformFlowDetectionHack(p)
  );
  preset.presets.push("@babel/preset-typescript");

  return preset;
};

export default removeFlowPreset;

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
