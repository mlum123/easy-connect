// Accordion component that toggles to collapse and open
// to display emails, upcoming calls from Google Calendar, etc.

import React from "react";
import { Collapse, ListGroup } from "reactstrap";
import Emails from "./Emails";
import Events from "./Events";
import GroupMeBox from "./GroupMeBox";
import "./Accordion.css";

class Accordion extends React.Component {
  constructor(props) {
    super(props);

    // only have email accordion open by default since it's the top one
    this.state = { isOpen: this.props.type === "emails" };

    this.toggle = this.toggle.bind(this);
  }

  // toggle whether Accordion is open or closed
  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    // display email, upcoming events, or groupme Accordion depending on props type passed in
    // only display groupme Accordion if contacts in state is not an empty array (that means we've logged into Google)
    return (
      <>
        {this.props.type === "emails" && this.props.emails.length > 0 ? (
          <ListGroup flush className="card">
            <div className="header">
              {this.props.type}
              <i
                className="fas fa-angle-down accordion-button"
                onClick={this.toggle}
              ></i>
            </div>
            <Collapse isOpen={this.state.isOpen}>
              <Emails emails={this.props.emails} />
            </Collapse>
          </ListGroup>
        ) : (
          ""
        )}
        {this.props.type === "upcoming events" &&
        this.props.events.length > 0 ? (
          <ListGroup flush className="card">
            <div className="header">
              {this.props.type}
              <i
                className="fas fa-angle-down accordion-button"
                onClick={this.toggle}
              ></i>
            </div>
            <Collapse isOpen={this.state.isOpen}>
              <Events events={this.props.events} />
            </Collapse>
          </ListGroup>
        ) : (
          ""
        )}
        {this.props.type === "groupme" &&
        this.props.contacts !== undefined &&
        this.props.contacts.length > 0 &&
        this.props.groups !== undefined &&
        this.props.groups.length > 0 ? (
          <ListGroup flush className="card">
            <div className="header">
              {this.props.type}
              <i
                className="fas fa-angle-down accordion-button"
                onClick={this.toggle}
              ></i>
            </div>
            <Collapse isOpen={this.state.isOpen}>
              <GroupMeBox groups={this.props.groups} />
            </Collapse>
          </ListGroup>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default Accordion;
