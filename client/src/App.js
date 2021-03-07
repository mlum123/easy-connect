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

    this.state = {
      googleSignedIn: false,
      contacts: [],
      emails: [],
      events: [],
    };

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
    this.getEvents();
  }

  // Google sign out button click event handler
  // reset state contacts, emails, events to be empty
  onHandleSignoutClick() {
    Google.handleSignoutClick();
    this.setState({
      googleSignedIn: Google.signedIn,
      contacts: [],
      emails: [],
      events: [],
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

  // call Google module function to use Google Calendar API to get events
  // (Google Meet and Zoom calls in particular)
  getEvents() {
    Google.getEvents()
      .then((events) => {
        this.setState({ events });
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
            <br></br>
          </Col>
          <Col xs="8">
            <Accordion type="emails" emails={this.state.emails} />
            <br></br>
            <Accordion type="upcoming events" events={this.state.events} />
            <br></br>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
