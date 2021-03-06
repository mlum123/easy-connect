import React from "react";
import { ListGroup, ListGroupItem, ListGroupItemText } from "reactstrap";
import "./Contacts.css";

class Contacts extends React.Component {
  render() {
    return (
      <ListGroup>
        <h3>contacts</h3>
        {this.props.contacts !== undefined
          ? this.props.contacts.map((contact) => {
              return (
                <ListGroupItem key={contact.resourceName} className="contact">
                  <ListGroupItemText>
                    <strong>{contact.name}</strong> <br></br>
                    {contact.email} | {contact.phone}
                  </ListGroupItemText>
                </ListGroupItem>
              );
            })
          : ""}
      </ListGroup>
    );
  }
}

export default Contacts;
