// Emails component displays all emails in user's inbox
// check if email is undefined before displaying it
// undefined emails don't get displayed
// if you go to Google module, you'll see that undefined emails were the ones not labeled inbox

import React from "react";
import { ListGroupItem, Row, Col } from "reactstrap";
import EmailModal from "./EmailModal";
import "./Emails.css";

class Emails extends React.Component {
  render() {
    return this.props.emails.length > 0 ? (
      <>
        {" "}
        {this.props.emails.map((email) => {
          return email !== undefined ? (
            <ListGroupItem key={email.subject}>
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
                  <EmailModal email={email} />
                </Col>
              </Row>
            </ListGroupItem>
          ) : (
            ""
          );
        })}
      </>
    ) : (
      ""
    );
  }
}

export default Emails;
