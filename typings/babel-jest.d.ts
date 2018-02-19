declare module "babel-jest" {
  interface BabelConfig {
    presets: (string | any[])[];
    babelrc: boolean;
  }

  interface Transformer {
    process: () => any;
  }

  export function createTransformer(config: BabelConfig): Transformer;
}
