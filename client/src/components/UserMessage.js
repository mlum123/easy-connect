// UserMessage component shows messages user
import React from "react";
import { Row, Col } from "reactstrap";
import "./UserMessage.css";

class UserMessage extends React.Component {
  render() {
    return (
      <Row>
        <Col>
          <div className="user-message">{this.props.message.text}</div>
        </Col>
      </Row>
    );
  }
}

export default UserMessage;
