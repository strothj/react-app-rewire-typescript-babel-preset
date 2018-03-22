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

// @babel/plugin-transform-flow-strip-types
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
