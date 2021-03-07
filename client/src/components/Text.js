// Text component with form to send text to phone num via Twilio SMS API
// uses Express backend API in server.js to communicate with Twilio SMS API to send text

import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

class Text extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: {
        recipient: "",
        textmessage: "",
      },
    };

    this.sendText = this.sendText.bind(this);
  }

  // send text using Express backend API in server.js that talks with Twilio SMS API
  sendText() {
    const { text } = this.state;

    // pass variables within the query string
    fetch(
      `http://localhost:5000/send-text?recipient=${text.recipient}&textmessage=${text.textmessage}`
    ).catch((err) => console.error(err));
  }

  render() {
    const { text } = this.state;

    return (
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
              this.setState({ text: { ...text, recipient: e.target.value } })
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
      </Form>
    );
  }
}

export default Text;
