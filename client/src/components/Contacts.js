// Contacts component displaying contacts list from Google
// and send text button + modal for sending texts via Twilio SMS API

import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import Text from "./Text";
import "./Contacts.css";

class Contacts extends React.Component {
  constructor(props) {
    super(props);

    this.state = { modal: false };
    this.toggle = this.toggle.bind(this);
  }

  // toggles whether send text (via Twilio SMS API) modal is open or not
  toggle() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    return this.props.contacts.length > 0 ? (
      <ListGroup flush className="card" id="contacts-card">
        <>
          <ListGroupItem className="header">
            contacts
            <button className="custom-button" onClick={this.toggle}>
              send text
            </button>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>send a text</ModalHeader>
              <ModalBody>
                <Text />
              </ModalBody>
            </Modal>
          </ListGroupItem>
          {this.props.contacts.map((contact) => {
            return (
              <ListGroupItem key={contact.resourceName} className="contact">
                <strong>{contact.name}</strong> <br></br>
                {contact.email} | {contact.phone}
              </ListGroupItem>
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
