import { storiesOf } from "@storybook/react";
import * as React from "react";

import SomeStorybookComponent from "./SomeStorybookComponent";

storiesOf("SomeStorybookComponent", module).add("default", () => (
  <SomeStorybookComponent />
));
