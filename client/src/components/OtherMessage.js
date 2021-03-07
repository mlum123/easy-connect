// OtherMessage component shows messages from people other than user
import React from "react";
import { Row, Col } from "reactstrap";
import "./OtherMessage.css";

class OtherMessage extends React.Component {
  render() {
    return (
      <Row>
        <Col>
          <div className="other-name">{this.props.message.name}</div>
          <div className="other-message">{this.props.message.text}</div>
        </Col>
      </Row>
    );
  }
}

export default OtherMessage;
