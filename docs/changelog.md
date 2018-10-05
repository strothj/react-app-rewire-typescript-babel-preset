# Changelog

## [3.0.0] - 2018-10-05

- Support for `react-scripts@2.0.2`, `react-scripts@2.0.3`, `react-scripts@2.0.4`. [PR #28](https://github.com/strothj/react-app-rewire-typescript-babel-preset/pull/28) (thanks @Corjen).

## [2.5.0] - 2018-09-26

### Added

- Support for `react-scripts@2.0.0-next.fb6e6f70` [PR #25](https://github.com/strothj/react-app-rewire-typescript-babel-preset/pull/25)

## [2.4.0] - 2018-08-27

### Added

- Allow babelrc in `babel-jest` transformer. See [PR #19](https://github.com/strothj/react-app-rewire-typescript-babel-preset/pull/19) (thanks @lee-reinhardt).

## [2.3.0] - 2018-06-18

### Added

- Add support for TSLint. See [PR #14](https://github.com/strothj/react-app-rewire-typescript-babel-preset/pull/14) / [Integrate TSLint](#integrate-tslint) (thanks @ianschmitz).

## [2.2.1] - 2018-06-10

### Fixed

- Resolve compatible issue between `@babel/core@7.0.0-beta.44` (used in `react-scripts@2.0.0-next.66cc7a90`) and `@babel/preset-typescript@^7.0.0-beta.48`. Fixes [#12](https://github.com/strothj/react-app-rewire-typescript-babel-preset/issues/12).

## [2.2.0] - 2018-05-19

### Added

- Support for loading `src/setupTests.ts` (TypeScript). The rewire will load an existing Javascript version if no TypeScript version is present. Fixes [#8](https://github.com/strothj/react-app-rewire-typescript-babel-preset/issues/8).

## [2.1.2] - 2018-05-15

### Added

- Added missing README to published package.

## [2.1.1] - 2018-04-05

### Fixed

- Prefer files ending with TypeScript extensions over Javascript ([#5](https://github.com/strothj/react-app-rewire-typescript-babel-preset/pull/5)).

## [2.1.0] - 2018-03-22

### Added

- Support for `react-scripts@2.0.0-next.b2fd8db8` (thanks [@detrohutt](https://github.com/strothj/react-app-rewire-typescript-babel-preset/pull/4))
