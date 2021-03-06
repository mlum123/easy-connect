import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

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
        <h2>send text</h2>
        <FormGroup>
          <Label for="phoneNum">to:</Label>
          <Input
            type="text"
            name="phoneNum"
            id="phoneNum"
            value={text.recipient}
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
            onChange={(e) =>
              this.setState({
                text: { ...text, textmessage: e.target.value },
              })
            }
          />
        </FormGroup>
        <Button onClick={this.sendText}> Send Text </Button>
      </Form>
    );
  }
}

export default Text;
