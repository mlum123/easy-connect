import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import "./Contacts.css";
import Text from "./Text";

class Contacts extends React.Component {
  constructor(props) {
    super(props);

    this.state = { modal: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    return this.props.contacts.length > 0 ? (
      <ListGroup flush className="card" id="contacts-card">
        <>
          <ListGroupItem className="header">
            contacts
            <button className="text-button" onClick={this.toggle}>
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
