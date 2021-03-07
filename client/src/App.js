// main App component for displaying entire page

import React from "react";
import { Row, Col } from "reactstrap";
import Contacts from "./components/Contacts";
import Accordion from "./components/Accordion";
import Google from "./Google";
import "./App.css";
import GroupMe from "./GroupMe";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      googleSignedIn: false,
      groupMeSignedIn: true,
      contacts: [],
      emails: [],
      events: [],
    };

    this.onHandleGoogleAuthClick = this.onHandleGoogleAuthClick.bind(this);
    this.onHandleGoogleSignoutClick = this.onHandleGoogleSignoutClick.bind(
      this
    );
    this.getContacts = this.getContacts.bind(this);
    this.getEmails = this.getEmails.bind(this);
    this.getEvents = this.getEvents.bind(this);
  }

  // Google sign in button click event handler
  onHandleGoogleAuthClick() {
    Google.handleAuthClick();
    this.setState({ googleSignedIn: Google.signedIn });
    this.getContacts();
    this.getEmails();
    this.getEvents();
  }

  // Google sign out button click event handler
  // reset state contacts, emails, events to be empty
  onHandleGoogleSignoutClick() {
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

  onHandleGroupMeAuthClick() {
    GroupMe.getGroups();
    GroupMe.getMessages(66918731);
    GroupMe.getMessages(38948204);
    // GroupMe.sendMessage(66918731, "good night!");
  }

  // when App component is mounted,
  // use Google module to load the auth2 library and API client library
  // also use GroupMe module to get groups
  componentDidMount() {
    Google.handleClientLoad();
    GroupMe.getGroups().then((groups) => {
      this.setState({ groups });
    });
  }

  render() {
    // authButton and signOutButton use Google module to handle sign in and sign out clicks
    // only display authButton (sign in) if user isn't signed in yet
    // only display signOutButton if user is signed in with Google
    let googleAuthButton = (
      <button className="auth-button" onClick={this.onHandleGoogleAuthClick}>
        sign in with google
      </button>
    );
    let googleSignOutButton = (
      <button className="auth-button" onClick={this.onHandleGoogleSignoutClick}>
        sign out
      </button>
    );

    // TODO - this button and onHandleGroupMeAuthClick function are just for testing purposes
    // remove
    let groupMeAuthButton = (
      <button className="auth-button" onClick={this.onHandleGroupMeAuthClick}>
        sign into groupme
      </button>
    );

    return (
      <div className="App">
        <div className="skewed"></div>
        <Col className="title">
          <Row>
            <Col xs="7">
              <h1>simply connect</h1>
            </Col>
            <Col xs="3">
              <h3>talking made easy</h3>
            </Col>
            <Col xs="2">
              {!this.state.googleSignedIn ? googleAuthButton : null}
              {this.state.googleSignedIn ? googleSignOutButton : null}
              {!this.state.groupMeSignedIn ? groupMeAuthButton : null}
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
            <Accordion
              type="groupme"
              contacts={this.state.contacts}
              groups={this.state.groups}
            />
            <br></br>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
