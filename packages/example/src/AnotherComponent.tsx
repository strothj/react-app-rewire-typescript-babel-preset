import * as React from "react";

export interface TypeScriptComponentProps {
  message: string;
}

export default class TypeScriptComponent extends React.Component<
  TypeScriptComponentProps
> {
  render() {
    return <p>{this.props.message}</p>;
  }
}
