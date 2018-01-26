const { presetReactApp } = require("./resolvedImports");

const removeFlowPreset = (...args) => {
  // Pass along arguments to babel-preset-react-app and generate its preset.
  const preset = presetReactApp(...args);

  // Replace the Flow preset with TypeScript.
  preset.presets = preset.presets.filter(
    p => !/FlowStripTypes/.test(p.toString())
  );
  preset.presets.push("@babel/preset-typescript");

  preset.plugins.push([
    "@babel/plugin-transform-modules-commonjs",
    { noInterop: true }
  ]);

  // Setting noInterop to true disables behavior where Babel creates synthetic
  // default exports. Setting this to match expected TypeScript behavior.
  // babelLoader.options.plugins = babelLoader.options.plugins || [];
  // babelLoader.options.plugins.push([
  // ]);

  return preset;
};

module.exports = removeFlowPreset;
