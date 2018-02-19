/**
 * This module replaces the one in react-scripts/config/jest/babelTransform.js.
 * It is a Babel transform for Jest which will use the Babel preset from this
 * package to add support for TypeScript.
 */

import path from "path";

// @ts-ignore
import babelJest from "./rewireBabelJest";

const transformer = babelJest.createTransformer({
  presets: [path.resolve(__dirname, "rewirePreset")],
  babelrc: false
});

// Not using a default export here on purpose to match the export structure
// of react-script's babelTransform.js.
module.exports = transformer;
