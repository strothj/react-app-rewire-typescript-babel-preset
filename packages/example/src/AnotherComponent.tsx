import * as React from "react";

// This syntax is incompatible with Flow but is fine in TypeScript. This should
// cause an error to occur if for some reason the Flow preset stays enabled.
export interface TypeScriptComponentProps<T extends string = string> {
  message: T;
}

export default class TypeScriptComponent extends React.Component<
  TypeScriptComponentProps
> {
  render() {
    return <p>{this.props.message}</p>;
  }
}
