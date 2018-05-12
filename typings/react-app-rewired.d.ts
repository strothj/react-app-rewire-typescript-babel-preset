declare module "react-app-rewired" {
  import { RuleSetRule } from "webpack";

  export type Matcher = (rule: RuleSetRule) => boolean;

  export function getBabelLoader(rules: RuleSetRule[]): RuleSetRule;

  export function getLoader(
    rules: RuleSetRule[],
    matcher: Matcher
  ): RuleSetRule;
}
