import * as React from "react";
import logo from "./logo.svg";
import { ReactComponent as TypeScriptLogo } from "./typescriptLogo.svg";
import "./App.css";

interface TypeScriptComponentProps {
  message: string;
}

class TypeScriptComponent extends React.Component<TypeScriptComponentProps> {
  render() {
    return <p>{this.props.message}</p>;
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <TypeScriptLogo
            className="App-typescript-logo"
            alt="TypeScript Logo"
          />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <TypeScriptComponent message="Hello from TypeScript component." />
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
