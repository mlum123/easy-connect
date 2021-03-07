// Contacts component displaying contacts list from Google
// and send text button + modal for sending texts via Twilio SMS API
// can also filter contacts by name

import React from "react";
import { ListGroup, ListGroupItem, Row, Col, Input } from "reactstrap";
import Text from "./Text";
import "./Contacts.css";

class Contacts extends React.Component {
  constructor(props) {
    super(props);

    this.state = { contactFilter: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  // when any form input changes, re-set its state to new value
  handleChange(event) {
    let { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    return this.props.contacts.length > 0 ? (
      <ListGroup flush className="card" id="contacts-card">
        <>
          <ListGroupItem className="header">
            <Row>
              <Col xs="4">contacts</Col>
              <Text contacts={this.props.contacts} />
            </Row>
            <Row>
              <Input
                type="text"
                name="contactFilter"
                id="contactFilter"
                placeholder="filter by name..."
                onChange={this.handleChange}
              ></Input>
            </Row>
          </ListGroupItem>
          {this.props.contacts.map((contact) => {
            return contact.name
              .toLowerCase()
              .includes(this.state.contactFilter.toLowerCase()) ? (
              <ListGroupItem key={contact.resourceName} className="contact">
                <strong>{contact.name}</strong> <br></br>
                {contact.email} | {contact.phone}
              </ListGroupItem>
            ) : (
              ""
            );
          })}
        </>
      </ListGroup>
    ) : (
      ""
    );
  }
}

export default Contacts;
