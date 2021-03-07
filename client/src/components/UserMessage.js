// UserMessage component shows GroupMe messages from user

import React from "react";
import { Row, Col } from "reactstrap";
import "./UserMessage.css";

class UserMessage extends React.Component {
  render() {
    return (
      <Row>
        <Col>
          <div className="user-message">
            {this.props.message.text}
            {this.props.message.attachments.map((attachment) => {
              return attachment.type === "image" ? (
                <>
                  <img alt="GroupMe" src={attachment.url} />
                  {attachment.url}
                </>
              ) : (
                ""
              );
            })}
          </div>
        </Col>
      </Row>
    );
  }
}

export default UserMessage;
