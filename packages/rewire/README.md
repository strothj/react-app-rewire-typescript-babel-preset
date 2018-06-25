# react-app-rewire-typescript-babel-preset

[![Circle CI][circle-status]][circle-link]

> Add TypeScript support to Create React App using @babel/preset-typescript.

react-app-rewire-typescript-babel-preset is a plugin for [react-app-rewired]
which adds support for TypeScript to [Create React App (react-scripts v2)][react-scripts-v2].

It uses the Babel preset [@babel/preset-typescript][babel-preset] as an alternative to Webpack loaders. This allows you to more easily use the Babel ecosystem of transforms and plugins.

[Changelog](docs/changelog.md)

## Documentation

Please see the full documentation here: https://react-app-rewire-typescript-babel-preset.netlify.com

## Example Config

After installation you'll end up with a `config-overrides.js` similar to this:

```javascript
const {
  rewireWebpack: rewireTypescript,
  rewireJest: rewireTypescriptJest,
  rewireTSLint
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

[circle-link]: https://circleci.com/gh/strothj/react-app-rewire-typescript-babel-preset
[circle-status]: https://circleci.com/gh/strothj/react-app-rewire-typescript-babel-preset.svg?style=shield&circle-token=3c1db615e8de775cca8548d5634019e56b8a1d6
[react-app-rewired]: https://github.com/timarney/react-app-rewired
[react-scripts-v2]: https://github.com/facebook/create-react-app/issues/3815
[babel-preset]: https://github.com/babel/babel/tree/master/packages/babel-preset-typescript
