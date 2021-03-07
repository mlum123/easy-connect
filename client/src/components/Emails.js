// Emails component displays all emails in user's inbox

import React from "react";
import { ListGroupItem, Row, Col, Badge } from "reactstrap";
import EmailModal from "./EmailModal";
import "./Emails.css";

class Emails extends React.Component {
  render() {
    return this.props.emails !== undefined && this.props.emails.length > 0 ? (
      <>
        {" "}
        {this.props.emails.map((email) => {
          return (
            <ListGroupItem className="item" key={email.subject}>
              <Row>
                <Col xs="9">
                  <strong>
                    {email.subject}
                    <br></br> <em>{email.from}</em>
                  </strong>
                  <br></br>
                  {email.text.substring(0, 80)}
                  {"..."}
                </Col>
                <Col xs="1">
                  {email.unread ? (
                    <Badge className="unread-badge" pill>
                      new
                    </Badge>
                  ) : (
                    ""
                  )}
                </Col>
                <Col xs="2">
                  <EmailModal email={email} />
                </Col>
              </Row>
            </ListGroupItem>
          );
        })}
      </>
    ) : (
      ""
    );
  }
}

export default Emails;
