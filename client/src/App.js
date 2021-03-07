// main App component for displaying entire page

import React from "react";
import { Row, Col } from "reactstrap";
import Contacts from "./components/Contacts";
import Accordion from "./components/Accordion";
import Google from "./Google";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { googleSignedIn: false, contacts: [], emails: [] };

    this.onHandleAuthClick = this.onHandleAuthClick.bind(this);
    this.onHandleSignoutClick = this.onHandleSignoutClick.bind(this);
    this.getContacts = this.getContacts.bind(this);
  }

  // Google sign in button click event handler
  onHandleAuthClick() {
    Google.handleAuthClick();
    this.setState({ googleSignedIn: Google.signedIn });
    this.getContacts();
    this.getEmails();
  }

  // Google sign out button click event handler
  onHandleSignoutClick() {
    Google.handleSignoutClick();
    this.setState({
      googleSignedIn: Google.signedIn,
      contacts: [],
      emails: [],
    });
  }

  // call Google module function to use People API to get Google Contacts
  getContacts() {
    Google.getContacts()
      .then((contacts) => {
        this.setState({ contacts });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // call Google module function to use Gmail API to get inbox emails
  getEmails() {
    Google.getEmails()
      .then((emails) => {
        this.setState({ emails });
      })
      .catch((err) => {
        console.log(err);
      });
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
      <button
        className="google-button"
        id="authorize-button"
        onClick={this.onHandleAuthClick}
      >
        sign in with google
      </button>
    );
    let signOutButton = (
      <button
        className="google-button"
        id="signout-button"
        onClick={this.onHandleSignoutClick}
      >
        sign out
      </button>
    );

    return (
      <div className="App">
        <div className="skewed"></div>
        <Col className="title">
          <Row>
            <Col xs="7">
              <h1>easy connect</h1>
            </Col>
            <Col xs="3">
              <h3>talking made simple</h3>
            </Col>
            <Col xs="2">
              {!this.state.googleSignedIn ? authButton : null}
              {this.state.googleSignedIn ? signOutButton : null}
            </Col>
          </Row>
        </Col>
        <Row>
          <Col xs="4">
            <Contacts contacts={this.state.contacts} />
          </Col>
          <Col xs="8">
            <Accordion type="email" emails={this.state.emails} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
