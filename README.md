# react-app-rewire-typescript-babel-preset [![Circle CI](https://circleci.com/gh/strothj/react-app-rewire-typescript-babel-preset.svg?style=shield&circle-token=3c1db615e8de775cca8548d5634019e56b8a1d6d)](https://circleci.com/gh/strothj/react-app-rewire-typescript-babel-preset)

> Add TypeScript support to Create React App using @babel/preset-typescript

This is a plugin for [react-app-rewired](https://github.com/timarney/react-app-rewired) that adds support for TypeScript using the Babel preset [@babel/preset-typescript](https://github.com/babel/babel/tree/master/packages/babel-preset-typescript).

## Changelog

### [2.1.1] - 2018-04-05

#### Fixed

* Prefer files ending with TypeScript extensions over Javascript ([#5](https://github.com/strothj/react-app-rewire-typescript-babel-preset/pull/5)).

### [2.1.0] - 2018-03-22

#### Added

* Support for `react-scripts@2.0.0-next.b2fd8db8` (thanks [@detrohutt](https://github.com/strothj/react-app-rewire-typescript-babel-preset/pull/4))

## Upgrading from v1

Update to the latest version of `react-scripts@next` and replace `react-app-rewired v1` with `react-app-rewired@next`.

## Issues and Limitations

This is experimental, should not be used for production, and will leave you without support from the create-react-app team. Use at your own risk.

For some background into the topic of using Babel to remove TypeScript type annotations, I recommend reading some of the following:

* http://artsy.github.io/blog/2017/11/27/Babel-7-and-TypeScript/
* https://babeljs.io/blog/2017/09/12/planning-for-7.0

The preset `@babel/preset-typescript` is not included in this package at this time. Once react-scripts v2 and Babel 7 officially release, this choice will be revisited. What this means is that you can expect to see missing peer dependency warnings for @babel/core.

## Installing / Getting started

Create a React project using version 2 of Create React App (currently beta).

```shell
$ create-react-app --scripts-version=react-scripts@next my-project
```

This will tell the `create-react-app` tool to use the beta version of `react-scripts`. When version 2 is officially released, the command will need to be run without `--scripts-version=react-scripts@next`.

Follow the installation directions for **[react-app-rewired](https://github.com/timarney/react-app-rewired)**.

**Important** You will need to install v2 of `react-app-rewired`, which at the time of writing can be installed using the command `npm install --save-dev react-app-rewired@next`.

Create a `config-overrides.js` in your project root with the following contents:

```javascript
const {
  rewireWebpack: rewireTypescript,
  rewireJest: rewireTypescriptJest
} = require("react-app-rewire-typescript-babel-preset");

module.exports = {
  webpack: function(config, env) {
    return rewireTypescript(config);
  },
  jest: function(config) {
    return rewireTypescriptJest(config);
  }
};
```

Install typings for React and Jest:

```shell
$ npm install --save-dev @types/react @types/react-dom @types/jest
```

Install react-app-rewire-typescript-babel-preset and [@babel/preset-typescript](https://github.com/babel/babel/tree/master/packages/babel-preset-typescript):

```shell
$ npm install --save-dev react-app-rewire-typescript-babel-preset @babel/preset-typescript
```

You can view an example project **[here](/packages/example).**

## Usage

### Entry Point

Rename files ending in the extension ".js" to ".ts" and ".tsx".

The entry point `src/index.js` must be renamed `src/index.tsx`.

### Type Definitions

You will need at a minimum the following type definitions:

* @types/react
* @types/react-dom
* @types/jest (for testing)

### SVG

Two types of imports are supported for SVG.

`import logoUrl from "./logo.svg";` gives you the URL.

`import { ReactComponent as Logo } from "./logo.svg";` gives you a component.

The following type definition can be used to support this.

```typescript
declare module "*.svg" {
  import * as React from "react";

  const value: string;
  const ReactComponent: React.ComponentClass;

  export default value;
  export { ReactComponent };
}
```

### Sample `tsconfig.json`

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
    "skipLibCheck": true,
    "pretty": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### Type Checking

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

## Developing

### Built With

This project targets Create React App version 2 (with Babel 7 support) and uses Yarn for dependency management.

### Prerequisites

This project uses [Yarn](https://yarnpkg.com/en/) for dependency management instead of npm. Ensure you are using Yarn when making modifications and improvements to this project.

### Setting up Dev

The project is structured as a monorepo to ensure that packages resolve correctly when used in a monorepo environment.

Clone the project and install the dependencies using Yarn.

```shell
git clone https://github.com/strothj/react-app-rewire-typescript-babel-preset.git
cd react-app-rewire-typescript-babel-preset/
yarn
```

The project in the example directory can be used for testing.

```shell
cd packages/example
yarn
yarn start
```

That will install the dependencies for the example project and start Create React App's development server.

## Style guide

This project uses a combination of TSLint (Airbnb config) and Prettier.

## License

[MIT](LICENSE.md)
