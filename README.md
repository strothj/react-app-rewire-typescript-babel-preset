# react-app-rewire-typescript-babel-preset

> Add TypeScript support to Create React App using @babel/preset-typescript

This is a plugin for [react-app-rewired](https://github.com/timarney/react-app-rewired) that adds support for TypeScript using the Babel preset [@babel/preset-typescript](https://github.com/babel/babel/tree/master/packages/babel-preset-typescript).

## Installing / Getting started

Create a React project using version 2 of Create React App (currently beta).

```shell
$ create-react-app --scripts-version=react-scripts@next my-project
```

This will tell the `create-react-app` tool to use the beta version of `react-scripts`. When version 2 is officially released, the command will need to be run without `--scripts-version=react-scripts@next`.

Follow the installation directions for **[react-app-rewired](https://github.com/timarney/react-app-rewired)**.

Create a `config-overrides.js` in your project root with the following contents:

```javascript
const rewireTypescript = require("react-app-rewire-typescript-babel-preset");

module.exports = function override(config, env) {
  config = rewireTypescript(config, env);
  return config;
};
```

You can view an example project **[here](/example).**

## Usage

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

## Developing

### Built With

This project targets Create React App version 2 (with Babel 7 support) and uses Yarn for dependency management.

### Prerequisites

This project uses [Yarn](https://yarnpkg.com/en/) for dependency management instead of npm. Ensure you are using Yarn when making modifications and improvements to this project.

### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing the project further:

```shell
git clone https://github.com/strothj/react-app-rewire-typescript-babel-preset.git
cd react-app-rewire-typescript-babel-preset/
yarn
```

The project in the example directory can be used for testing.

```shell
cd example
yarn
yarn start
```

That will install the dependencies for the example project and start Create React App's development server.

## Style guide

This project uses a combination of ESLint (Airbnb config) and Prettier.

## License

[MIT](LICENSE.md)
