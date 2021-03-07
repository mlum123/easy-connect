// Email Modal component with the modal itself, and button for opening modal
// Shows full email with sender name + email address, subject, message
// Shows form to reply to email, uses Google module to send email

import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import Google from "../Google";

class EmailModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      activeEmail: {},
      to: "",
      subject: "",
      email: "",
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  // toggle modal
  toggle() {
    this.setState({ modal: !this.state.modal });
  }

  // when any form input changes, re-set its state to new value
  // so that we can submit the state values when we click submit button, calling onSubmitForm function
  handleChange(event) {
    let { name, value } = event.target;

    this.setState({ [name]: value });
  }

  // use Google module to send email
  onSubmitForm() {
    Google.sendEmail(this.state.to, this.state.subject, this.state.email);
    console.log(this.state);

    // close modal
    this.toggle();
  }

  render() {
    return (
      <>
        <button className="custom-button" onClick={this.toggle}>
          <i className="fas fa-angle-double-right"></i>
        </button>
        <Modal
          className="email-modal"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>
            {this.props.email.subject} <br></br>
            <em className="from">{this.props.email.from}</em>
          </ModalHeader>
          <ModalBody>{this.props.email.text}</ModalBody>
          <ModalFooter className="mr-auto">
            <Form className="send-email-form">
              <FormGroup>
                <Label for="to">to:</Label>
                <Input
                  type="text"
                  name="to"
                  defaultValue={this.props.email.from.split(" ").pop()}
                  id="to"
                  onChange={this.handleChange}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="subject">subject:</Label>
                <Input
                  type="text"
                  name="subject"
                  defaultValue="enter subject"
                  id="subject"
                  onChange={this.handleChange}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="email">email:</Label>
                <Input
                  type="textarea"
                  name="email"
                  defaultValue="type your email here!"
                  id="email"
                  onChange={this.handleChange}
                ></Input>
              </FormGroup>
              <button class="custom-button" onClick={this.onSubmitForm}>
                reply
              </button>
            </Form>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default EmailModal;
