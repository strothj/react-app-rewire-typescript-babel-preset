const { presetReactApp } = require("./resolvedImports");

const removeFlowPreset = (...args) => {
  // Pass along arguments to babel-preset-react-app and generate its preset.
  const preset = presetReactApp(...args);

  // Add typescript preset to react-app preset's list of presets
  preset.presets.push("@babel/preset-typescript");

  return preset;
};

module.exports = removeFlowPreset;
