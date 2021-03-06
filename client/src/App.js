import React from "react";
import "./App.css";
import Text from "./components/Text";
import Google from "./Google";
import { Button } from "reactstrap";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { signedIn: false };
  }

  // Google sign in button click event handler
  onHandleAuthClick() {
    Google.handleAuthClick();
  }

  // Google sign out button click event handler
  onHandleSignoutClick() {
    Google.handleSignoutClick();
  }

  // when App component is mounted,
  // use Google module to load the auth2 library and API client library
  componentDidMount() {
    Google.handleClientLoad();
  }

  render() {
    // authButton and signOutButton use Google module to handle sign in and sign out clicks
    // only display authButton (sign in) if user isn't signed in yet
    // only display signOutButton if user is signed in with Google
    let authButton = (
      <Button
        className="google-button"
        id="authorize-button"
        onClick={this.onHandleAuthClick}
      >
        sign in with google
      </Button>
    );
    let signOutButton = (
      <Button
        className="google-button"
        id="signout-button"
        onClick={this.onHandleSignoutClick}
      >
        sign out
      </Button>
    );

    return (
      <div className="App">
        <header>
          {!this.state.signedIn ? authButton : null}
          {this.state.signedIn ? signOutButton : null}
        </header>
        <h1>easy connect</h1>
        <h3>talking made simple</h3>
      </div>
    );
  }
}

export default App;
