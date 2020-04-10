import React from "react";
import Form from "./Form";
import logo from "./logo.png";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <h1>ISS Viewing Info</h1>
            <img src={logo} className="logo" alt="logo" />
          </div>
          <div style={{ width: "500px" }}>
            <Form></Form>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
