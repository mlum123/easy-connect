// Accordion component that toggles to collapse and open
// to display emails, upcoming calls, etc.

import React from "react";
import { Collapse, Card, ListGroup, ListGroupItem } from "reactstrap";
import Emails from "./Emails";
import "./Accordion.css";

class Accordion extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: true };

    this.toggle = this.toggle.bind(this);
  }

  // toggle whether Accordion is open or closed
  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    // if this is an Accordion for email (check using the props type), display email Accordion
    return this.props.type === "email" && this.props.emails.length > 0 ? (
      <Card className="card">
        <ListGroup flush>
          <>
            <ListGroupItem className="header">
              {this.props.type}
              <i
                className="fas fa-angle-down accordion-button"
                onClick={this.toggle}
              ></i>
            </ListGroupItem>
            <Collapse isOpen={this.state.isOpen}>
              <Emails emails={this.props.emails} />
            </Collapse>
          </>
        </ListGroup>
      </Card>
    ) : (
      ""
    );
  }
}

export default Accordion;
