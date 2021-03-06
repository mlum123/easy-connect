const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

// Twilio requirements
const accountSid = "ACd021887f0fa79590ea350b26c0b19863";
const authToken = "750050e3ac4858e77a96dfbc3d58cbc8";
const client = new twilio(accountSid, authToken);

const app = express(); // alias

app.use(cors());

// welcome page for server
app.get("/", (req, res) => {
  res.send("Welcome to the Express Server");
});

// Twilio text
app.get("/send-text", (req, res) => {
  // _GET variables, passed via query string
  const { recipient, textmessage } = req.query;

  // send text
  client.messages
    .create({
      body: textmessage,
      to: "+1" + recipient,
      from: "+17089984991", // from Twilio
    })
    .then((message) => console.log(message.body));
});

// http://localhost:5000
const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}.`));
