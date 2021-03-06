import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import "./Contacts.css";

class Contacts extends React.Component {
  render() {
    return (
      <ListGroup flush>
        {this.props.contacts !== [] ? (
          <>
            <ListGroupItem className="contacts">contacts</ListGroupItem>
            {this.props.contacts.map((contact) => {
              return (
                <ListGroupItem key={contact.resourceName} className="contact">
                  <strong>{contact.name}</strong> <br></br>
                  {contact.email} | {contact.phone}
                </ListGroupItem>
              );
            })}
          </>
        ) : (
          ""
        )}
      </ListGroup>
    );
  }
}

export default Contacts;
