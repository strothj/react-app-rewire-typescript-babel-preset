/**
 * Jest technically supports both Babel 6 and Babel 7. When requiring babel-jest
 * in a monorepo environment, Babel 6 can sometimes be resolved rather than the
 * desired Babel 7. The TypeScript transform requires Babel 7.
 */
import fs from "fs";

let moduleContents = fs.readFileSync(require.resolve("babel-jest"), "utf8");
moduleContents = moduleContents.replace(
  /require\('babel-core'\)/g,
  "require('@babel/core')"
);

/* tslint:disable-next-line:no-eval */
eval(moduleContents);
