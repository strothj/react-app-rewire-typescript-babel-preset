declare module "babel-preset-react-app" {
  function preset(
    ...args: any[]
  ): {
    presets: string[];
  };

  export default preset;
}
