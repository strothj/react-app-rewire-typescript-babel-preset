# Installation

## Create a React Project

Create a React project using version 2 of Create React App (currently beta).

```shell
create-react-app --scripts-version=react-scripts@next my-project
```

?> Notice that `--scripts-version=react-scripts@next` was used in the command. This is required to get the Babel 7 version of `react-scripts`. This is required to use the TypeScript Babel preset.

You can visit the [react-app-rewired](https://github.com/timarney/react-app-rewired) project for information on what it does and how it works.

## Additional Packages

Install the following packages:

- react-app-rewired@next
- react-app-rewire-typescript-babel-preset
- @babel/preset-typescript
- @types/react
- @types/react-dom
- @types/jest

?> Notice that `react-app-rewired@next` is used. This version has a change that
is needed to properly support `react-scripts` v2.

#### NPM

```shell
npm install --save-dev react-app-rewired@next react-app-rewire-typescript-babel-preset @babel/preset-typescript @types/react @types/react-dom @types/jest
```

#### Yarn

```shell
yarn add --dev react-app-rewired@next react-app-rewire-typescript-babel-preset @babel/preset-typescript @types/react @types/react-dom @types/jest
```

## TSLint

You can integrate TSLint into your terminal like Create React App's stock ESLint.

This rewire includes `tslint-loader`. You will need to install `tslint` as a dev dependency and add a corresponding `tslint.json`.

Install the following packages:

- typescript
- tslint

#### NPM

```shell
npm install --save-dev typescript tslint
```

#### Yarn

```shell
yarn add --dev typescript tslint
```

## React App Rewired Configuration

Create a `config-overrides.js` file in the root of your project. This file tells [react-app-rewired](https://github.com/timarney/react-app-rewired) what configuration changes are needed to the build system.

```js
const {
  rewireWebpack: rewireTypescript,
  rewireJest: rewireTypescriptJest,
  rewireTSLint // Optional, needed if using the TSLint integration.
} = require("react-app-rewire-typescript-babel-preset");

module.exports = {
  webpack: function(config, env) {
    config = rewireTypescript(config);

    // Optional, needed if using the TSLint integration.
    config = rewireTSLint(config, /* {} - optional tslint-loader options */);

    return config;
  },
  jest: function(config) {
    return rewireTypescriptJest(config);
  }
};
```

## Usage

You are able to use source files ending in the extensions: `.js`, `.jsx`, `.ts`, `.tsx`.

!> The entry point `src/index.js` must be renamed to `src/index.tsx`.

## SVG

Create React App v2 supports using SVGs as both normal assets and as imported React components.

`import logoUrl from "./logo.svg";` gives you the URL.

`import { ReactComponent as Logo } from "./logo.svg";` gives you a component.

The following type definition can be used to support this.

```typescript
declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}
```

## Sample `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs",
    "moduleResolution": "node",
    "lib": ["es2017", "dom"],
    "jsx": "react",
    "baseUrl": "./src",
    "noEmit": true,
    "pretty": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "isolatedModules": true
  }
}
```

?> Notice that the `noEmit` compiler option is used. This is optional but recommended because the TypeScript compiler (tsc) is never used. You can add a package.json script to perform a type check over your code.

?> The `isolatedModules` option is used so that TypeScript can call out constructs which currently give Babel trouble. Things, like re-exporting interfaces, can lead to Webpack compiler errors.  
See:  
https://github.com/strothj/react-app-rewire-typescript-babel-preset/issues/15
https://blogs.msdn.microsoft.com/typescript/2018/08/27/typescript-and-babel-7/

## Type Checking

Type checking largely relies on your editor's integration.

You can add a type check command to your package scripts:

package.json

```json
{
  "scripts": {
    "type-check": "tsc"
  }
}
```

For this to work you will need to install TypeScript as a dev dependency:

```shell
$ npm install --save-dev typescript
```

?> You'll also need to add the `noEmit` option to your `tsconfig.json` to prevent your source files from being compiled. See the above sample.

## Jest

#### Babel

When using Jest, your code is not compiled via Webpack. Any changes made in `config-overrides.js` to Webpack's Babel config will **not** be applied when running tests in Jest.

If you need to load Babel plugins/presets during testing, set up an external Babel config (see: https://babeljs.io/docs/en/next/configuration.html).

You can ensure this config only targets the "test" environment:

```json
{
  "env": {
    "test": {
      "plugins": ["emotion"]
    }
  }
}
```
