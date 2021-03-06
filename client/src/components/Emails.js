import React from "react";
import { Collapse, Card, ListGroup, ListGroupItem, Row, Col } from "reactstrap";
import "./Emails.css";

class Emails extends React.Component {
  render() {
    return this.props.emails.length > 0
      ? this.props.emails.map((email) => {
          return (
            <ListGroupItem key={email[0]}>
              <Row>
                <Col xs="10">
                  <strong>
                    {email.subject}
                    <br></br> <em>{email.from}</em>
                  </strong>
                  <br></br>
                  {email.text.substring(0, 85)}
                  {"..."}
                </Col>
                <Col xs="2">
                  <button className="email-button">
                    <i className="fas fa-angle-double-right"></i>
                  </button>
                </Col>
              </Row>
            </ListGroupItem>
          );
        })
      : "";
  }
}

export default Emails;
