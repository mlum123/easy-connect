// Text component with button to open modal + modal with form
// to send text to phone num via Twilio SMS API
// uses Express backend API in server.js to communicate with Twilio SMS API to send text

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
                <Label for="phoneNum">to:</Label>
                <Input
                  type="text"
                  name="phoneNum"
                  id="phoneNum"
                  value={text.recipient}
                  placeholder="1234567890"
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
