/**
 * This module replaces the one in react-scripts/config/jest/babelTransform.js.
 * It is a Babel transform for Jest which will use the Babel preset from this
 * package to add support for TypeScript.
 */

const path = require("path");
const { babelJest } = require("./resolvedImports");

module.exports = babelJest.createTransformer({
  presets: [path.resolve(__dirname, "rewirePreset")],
  babelrc: false
});
