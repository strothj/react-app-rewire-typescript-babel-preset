import * as React from "react";
import logo from "./logo.svg";
import { ReactComponent as TypeScriptLogo } from "./typescriptLogo.svg";
import AnotherComponent from "./AnotherComponent";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <TypeScriptLogo className="App-typescript-logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <AnotherComponent message="Hello from another TypeScript component." />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
