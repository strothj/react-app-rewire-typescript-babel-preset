import presetReactApp from "babel-preset-react-app";

const removeFlowPreset = (...args: any[]) => {
  // Pass along arguments to babel-preset-react-app and generate its preset.
  const preset = presetReactApp(...args);

  // Replace the Flow preset with TypeScript.
  preset.presets = preset.presets.filter(
    p => !/FlowStripTypes/.test(p.toString())
  );
  preset.presets.push("@babel/preset-typescript");

  return preset;
};

export default removeFlowPreset;
