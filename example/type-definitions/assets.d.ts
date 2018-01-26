declare module "*.svg" {
  import * as React from "react";

  const value: string;
  const ReactComponent: React.ComponentClass;

  export default value;
  export { ReactComponent };
}
