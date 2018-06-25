# Developing

## Built With

This project targets Create React App version 2 (with Babel 7 support) and uses Yarn for dependency management.

## Prerequisites

This project uses [Yarn](https://yarnpkg.com/en/) for dependency management instead of npm. Ensure you are using Yarn when making modifications and improvements to this project.

## Setting up Dev

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
