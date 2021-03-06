import React from "react";
import "./App.css";
import Google from "./Google";
import { Col, Button } from "reactstrap";
import Contacts from "./components/Contacts";
import Text from "./components/Text";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { googleSignedIn: false };

    this.getContacts = this.getContacts.bind(this);
  }

  // Google sign in button click event handler
  onHandleAuthClick() {
    Google.handleAuthClick();
  }

  // Google sign out button click event handler
  onHandleSignoutClick() {
    Google.handleSignoutClick();
  }

  // use Google People API to get contacts
  getContacts() {
    Google.getContacts()
      .then((contacts) => {
        this.setState({ contacts });
        this.setState({ googleSignedIn: Google.signedIn });
        console.log(this.state);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // when App component is mounted,
  // use Google module to load the auth2 library and API client library
  componentDidMount() {
    Google.handleClientLoad();
    this.getContacts();
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
        <div className="title">
          <h1>easy connect</h1>
          <h3>talking made simple</h3>
        </div>
        {!this.state.googleSignedIn ? authButton : null}
        {this.state.googleSignedIn ? signOutButton : null}
        <Col xs="4">
          <Contacts contacts={this.state.contacts} />
        </Col>
      </div>
    );
  }
}

export default App;
