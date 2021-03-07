// Text component with button to open modal + modal with form
// to send text to phone num via Twilio SMS API
// uses Express backend API in server.js to communicate with Twilio SMS API to send text
// if you type the full name of a contact, it'll automatically input the phone num for you

import React from "react";
import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

class Text extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      text: {
        person: "",
        recipient: "",
        textmessage: "",
      },
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendText = this.sendText.bind(this);
  }

  // toggles whether send text (via Twilio SMS API) modal is open or not
  toggle() {
    this.setState({ modal: !this.state.modal });
  }

  // when any form input changes, re-set its state to new value
  handleChange(event) {
    let { name, value } = event.target;

    this.setState({ [name]: value });
  }

  // create mapping of contact names to phone nums
  getPhoneNums() {
    let mapping = {};
    for (let contact of this.props.contacts) {
      mapping[contact.name] = contact.phone;
    }
    return mapping;
  }

  // send text using Express backend API in server.js that talks with Twilio SMS API
  sendText(e) {
    e.preventDefault();

    const { text } = this.state;

    // pass variables within the query string
    fetch(
      `http://localhost:5000/send-text?recipient=${text.recipient}&textmessage=${text.textmessage}`
    ).catch((err) => console.error(err));

    // close modal
    this.toggle();
  }

  render() {
    const { text } = this.state;

    return (
      <>
        <Col xs="8">
          <button className="custom-button" onClick={this.toggle}>
            text
          </button>
        </Col>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>send a text</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="person">to:</Label>
                <Input
                  type="text"
                  name="person"
                  id="person"
                  value={text.person}
                  placeholder="enter name"
                  onChange={(e) =>
                    this.setState({
                      text: {
                        ...text,
                        person: e.target.value,
                        recipient: this.getPhoneNums()[e.target.value],
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label for="phoneNum">phone number:</Label>
                <Input
                  type="text"
                  name="phoneNum"
                  id="phoneNum"
                  value={text.recipient}
                  placeholder="enter phone number, or type name above to retrieve number!"
                  onChange={(e) =>
                    this.setState({
                      text: { ...text, recipient: e.target.value },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label for="message">message:</Label>
                <Input
                  type="textarea"
                  name="message"
                  id="message"
                  value={text.textmessage}
                  placeholder="type your message here!"
                  onChange={(e) =>
                    this.setState({
                      text: { ...text, textmessage: e.target.value },
                    })
                  }
                />
              </FormGroup>
              <button className="custom-button" onClick={this.sendText}>
                send text
              </button>
            </Form>{" "}
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default Text;
