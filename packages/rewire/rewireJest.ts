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
        setting[j] = setting[j].replace("js,jsx,mjs", "ts,tsx,js,jsx,mjs");
        setting[j] = setting[j].replace("js|jsx|mjs", "ts|tsx|js|jsx|mjs");
      }
    } else if (typeof setting === "object") {
      // Replace file extensions in keys of setting dictionaries.
      const settingObj = {};

      Object.keys(setting).forEach(settingObjKey => {
        const newSettingsObjKey = settingObjKey.replace(
          "js|jsx|mjs",
          "ts|tsx|js|jsx|mjs"
        );
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

// We reimplement the logic from "createJestConfig.js" to look for a TypeScript
// version of the setupTests file instead of the original Javascript.
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
  const setupTestsFile = fs.existsSync(
    // ref: create-react-app/packages/react-scripts/config/paths.js
    // > testsSetup: resolveApp('src/setupTests.js'),
    reactScriptsPaths.testsSetup.replace(/\.js$/, ".ts")
  )
    ? "<rootDir>/src/setupTests.ts"
    : undefined;

  return {
    ...config,
    setupTestFrameworkScriptFile: setupTestsFile
  };
}

export default rewireJest;
