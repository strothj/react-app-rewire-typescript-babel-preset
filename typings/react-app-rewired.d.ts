declare module "react-app-rewired" {
  import { Rule, Loader } from "webpack";

  type Matcher = (rule: Rule) => Loader | boolean | undefined;

  export function getBabelLoader(rules: Rule[]): Rule;
  export function getLoader(rules: Rule[], matcher: Matcher): Rule;
}
