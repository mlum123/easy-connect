import React from "react";
import { Collapse, Card, ListGroup, ListGroupItem } from "reactstrap";
import "./Accordion.css";
import Emails from "./Emails";

class Accordion extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: true };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
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
