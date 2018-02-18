declare module "react-scripts/config/paths" {
  type PathField =
    | "dotenv"
    | "appPath"
    | "appBuild"
    | "appPublic"
    | "appHtml"
    | "appIndexJs"
    | "appPackageJson"
    | "appSrc"
    | "testsSetup"
    | "appNodeModules"
    | "publicUrl"
    | "servedPath";

  type Paths = Record<PathField, string>;

  const paths: Paths;

  export default paths;
}
