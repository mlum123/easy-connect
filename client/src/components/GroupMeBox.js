// GroupMeBox component displays GroupMe groups
// contains GroupMeModal component with button to open group chat modal

import React from "react";
import { ListGroupItem, Row, Col } from "reactstrap";
import GroupMeModal from "./GroupMeModal";
import "./GroupMeBox.css";

class GroupMeBox extends React.Component {
  render() {
    return this.props.groups.length > 0 ? (
      <>
        {" "}
        {this.props.groups.map((group) => {
          return (
            <ListGroupItem className="item" key={group.id}>
              <Row>
                <Col xs="10">
                  <strong>{group.name}</strong>
                  <br></br>
                  <em>
                    {group.members.map((member, i) => {
                      return i < 5 && member.name + " | ";
                    })}
                    {group.members.length >= 5 ? " and more..." : ""}
                  </em>
                  <br></br>
                </Col>
                <Col xs="2">
                  <GroupMeModal group={group} />
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

export default GroupMeBox;
