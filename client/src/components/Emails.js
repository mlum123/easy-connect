import React from "react";
import { Card, ListGroup, ListGroupItem } from "reactstrap";
import "./Emails.css";

class Emails extends React.Component {
  render() {
    return (
      <Card className="card emails">
        <ListGroup flush>
          {this.props.emails !== [] ? (
            <>
              <ListGroupItem className="header">emails</ListGroupItem>
              {this.props.emails.map((email) => {
                return (
                  <ListGroupItem key={email[0]} className="contact">
                    {email.substring(0, 85)}
                    {"..."}
                  </ListGroupItem>
                );
              })}
            </>
          ) : (
            ""
          )}
        </ListGroup>
      </Card>
    );
  }
}

export default Emails;
