// GroupMe Modal component with the modal itself, and button for opening modal
// Uses GroupMe modal to get messages from group
// Shows input area to reply to group chat, uses GroupMe module to send message

import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import UserMessage from "./UserMessage";
import OtherMessage from "./OtherMessage";
import GroupMe from "../GroupMe";

class GroupMeModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      groupId: this.props.group.id,
      messages: [],
      message: "",
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  // toggle modal
  toggle() {
    if (!this.state.modal) {
      GroupMe.getMessages(this.props.group.id).then((res) => {
        this.setState({ messages: res.messages });
      });
    }

    this.setState({ modal: !this.state.modal });
  }

  // when any form input changes, re-set its state to new value
  // so that we can submit the state values when we click submit button, calling onSubmitForm function
  handleChange(event) {
    let { name, value } = event.target;

    this.setState({ [name]: value });
  }

  // use Google module to send email
  onSubmitForm(e) {
    e.preventDefault();

    GroupMe.sendMessage(this.state.groupId, this.state.message).then((res) => {
      GroupMe.getMessages(this.props.group.id).then((res) => {
        this.setState({ messages: res.messages });
      });
    });
  }

  componentDidMount() {
    GroupMe.getUserInfo().then((res) => {
      this.setState({ userName: res.name });
    });
  }

  render() {
    return (
      <>
        <button className="custom-button" onClick={this.toggle}>
          <i className="fas fa-angle-double-right"></i>
        </button>
        <Modal
          className="groupme-modal"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>
            {this.props.group.name} <br></br>
          </ModalHeader>
          <ModalBody className="messages">
            {this.state.messages.reverse().map((message, i) => {
              return message.name === this.state.userName ? (
                <UserMessage key={i} message={message} />
              ) : (
                <OtherMessage key={i} message={message} />
              );
            })}
          </ModalBody>
          <ModalFooter className="mr-auto">
            <Form className="send-email-form">
              <FormGroup>
                <Input
                  type="text"
                  name="message"
                  placeholder={this.state.message}
                  id="message"
                  onChange={this.handleChange}
                ></Input>
              </FormGroup>
              <button className="custom-button" onClick={this.onSubmitForm}>
                reply
              </button>
            </Form>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default GroupMeModal;
