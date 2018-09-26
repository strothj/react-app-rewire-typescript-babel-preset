import fs from "fs";
import path from "path";
import reactScriptsPaths from "react-scripts/config/paths";

// Replace the custom Babel transform in react-scripts with the one from this
// package. We do this to force the use of a preset with TypeScript support.
const replaceBabelTransform = (settingValue: string) =>
  /babelTransform\.js/.test(settingValue)
    ? path.resolve(__dirname, "rewireBabelTransform.js")
    : settingValue;

const rewireJest = (config: any) => {
  const settingKeys = Object.keys(config);

  /* tslint:disable-next-line */
  for (let i = 0; i < settingKeys.length; i += 1) {
    const setting = config[settingKeys[i]];

    if (Array.isArray(setting)) {
      // Replace file extensions in setting arrays.
      for (let j = 0; j < setting.length; j += 1) {
        setting[j] = replaceFirstMatch(setting[j], [
          // TODO: Remove this after beta. Special handling for
          // pre-2.0.0-next.fb6e6f70. JavaScript modules were supported in prior
          // versions, so we need to take the additional file extension into
          // account.
          { searchValue: "js,jsx,mjs", replaceValue: "ts,tsx,js,jsx,mjs" },
          { searchValue: "js,jsx", replaceValue: "ts,tsx,js,jsx" }
        ]);
        setting[j] = replaceFirstMatch(setting[j], [
          // TODO: Remove this after beta. Special handling for
          // pre-2.0.0-next.fb6e6f70. JavaScript modules were supported in prior
          // versions, so we need to take the additional file extension into
          // account.
          { searchValue: "js|jsx|mjs", replaceValue: "ts|tsx|js|jsx|mjs" },
          { searchValue: "js|jsx", replaceValue: "ts|tsx|js|jsx" }
        ]);
      }
    } else if (typeof setting === "object") {
      // Replace file extensions in keys of setting dictionaries.
      const settingObj = {};

      Object.keys(setting).forEach(settingObjKey => {
        const newSettingsObjKey = replaceFirstMatch(settingObjKey, [
          // TODO: Remove this after beta. Special handling for
          // pre-2.0.0-next.fb6e6f70. JavaScript modules were supported in prior
          // versions, so we need to take the additional file extension into
          // account.
          { searchValue: "js|jsx|mjs", replaceValue: "ts|tsx|js|jsx|mjs" },
          { searchValue: "js|jsx", replaceValue: "ts|tsx|js|jsx" }
        ]);
        const newSettingValue = replaceBabelTransform(setting[settingObjKey]);
        // @ts-ignore
        settingObj[newSettingsObjKey] = newSettingValue;
      });

      config[settingKeys[i]] = settingObj;
    }
  }

  config.moduleFileExtensions.push("ts", "tsx", "web.ts");

  // tslint:disable-next-line:no-parameter-reassignment
  config = rewireSetupTestFrameworkScriptFile(config);

  return config;
};

// We reimplement the logic from "createJestConfig.js" so we can use
// "/src/setupTests.ts" . If no TypeScript version is available, we look for
// "/src/setupTests.js".
//
// ref: create-react-app/packages/react-scripts/scripts/utils/createJestConfig.js
// ```
// // Use this instead of `paths.testsSetup` to avoid putting
// // an absolute filename into configuration after ejecting.
// const setupTestsFile = fs.existsSync(paths.testsSetup)
//   ? '<rootDir>/src/setupTests.js'
//   : undefined;
// ```
function rewireSetupTestFrameworkScriptFile(config: object): object {
  // ref: create-react-app/packages/react-scripts/config/paths.js
  // > testsSetup: resolveApp('src/setupTests.js'),
  const setupTestsFile = [
    // Check for TypeScript version of setupTests first.
    [
      reactScriptsPaths.testsSetup.replace(/\.js$/, ".ts"),
      "<rootDir>/src/setupTests.ts"
    ],
    // Use Javascript version if TypeScript version is not present.
    [reactScriptsPaths.testsSetup, "<rootDir>/src/setupTests.js"]
  ].reduce<string | undefined>((acc, [filePath, settingsValue]) => {
    if (acc) return acc;
    return fs.existsSync(filePath) ? settingsValue : undefined;
  }, undefined);

  return {
    ...config,
    setupTestFrameworkScriptFile: setupTestsFile
  };
}

/**
 * Perform a String.replace on the target string. Return the first change or the
 * original value if no changes occurred.
 *
 * @param str Target string
 * @param replacements Series of string replacements to attempt
 */
function replaceFirstMatch(
  str: string,
  replacements: { searchValue: string; replaceValue: string }[]
): string {
  let newValue: string;
  for (const replacement of replacements) {
    newValue = str.replace(replacement.searchValue, replacement.replaceValue);
    if (newValue !== str) return newValue;
  }
  return str;
}

export default rewireJest;
