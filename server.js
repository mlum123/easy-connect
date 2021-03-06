// server.js sets up Express backend to use Twilio SMS API
// to send texts to specified phone nums from my Twilio phone number thru web app
const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

// to use Twilio environment variables in .env
const dotenv = require("dotenv");
dotenv.config();

// Twilio requirements
// get Twilio account info from environment variables in .env file
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
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
      from: "+17089984991", // from my Twilio phone num
    })
    .then((message) => console.log(message.body));
});

// http://localhost:5000
const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}.`));
