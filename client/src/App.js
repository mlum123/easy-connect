import React from "react";
import "./App.css";
import Text from "./components/Text";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>EasyConnect</h1>
          <h3>talking made simple</h3>
        </header>
        <Text />
      </div>
    );
  }
}

export default App;
