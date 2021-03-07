// Google module using OAuth2.0 authentication
// functions to view and edit user's Google Contacts using People API,
// send emails using Gmail API,
// view upcoming events using Google Calendar API
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const DISCOVERY_DOCS = [
  "https://people.googleapis.com/$discovery/rest?version=v1",
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  "https://gmail.googleapis.com/$discovery/rest?version=v1",
];
const SCOPES =
  "https://www.googleapis.com/auth/contacts https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/gmail.modify";

let gapi = window.gapi;

const Google = {
  signedIn: false,

  // Sign in the user upon button click.
  handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
  },

  // Sign out the user upon button click.
  handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut();
  },

  // On load, called to load the auth2 library and API client library.
  handleClientLoad() {
    gapi.load("client:auth2", this.initClient);
  },

  initClient() {
    gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(function () {
        // Listen for sign-in state changes.

        gapi.auth2
          .getAuthInstance()
          .isSignedIn.listen(Google.updateSigninStatus);

        // Handle the initial sign-in state.
        Google.updateSigninStatus(
          gapi.auth2.getAuthInstance().isSignedIn.get()
        );
      });
  },

  // Called when the signed in status changes, to update the UI appropriately.
  // After a sign-in, the API is called.
  updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      Google.signedIn = true;
    } else {
      Google.signedIn = false;
    }
  },

  // Use People API to get user's contacts' names, emails, phone nums
  getContacts() {
    return gapi.client.people.people.connections
      .list({
        resourceName: "people/me",
        personFields: "names,emailAddresses,phoneNumbers",
        sortOrder: "FIRST_NAME_ASCENDING",
      })
      .then((res) => {
        const contacts = res.result.connections;

        let contactsCleaned = contacts.map((contact) => {
          return {
            resourceName: contact.resourceName,
            name: contact.names[0].displayName,
            email: contact.emailAddresses[0].value,
            phone: contact.phoneNumbers[0].value,
          };
        });
        return contactsCleaned;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  },

  // Use Google Calendar API to get upcoming Zoom and Google Meet events on user's Google Calendar
  getEvents() {
    return gapi.client.calendar.events
      .list({
        calendarId: "primary",
        showDeleted: false,
        singleEvents: true,
        orderBy: "startTime",
        maxResults: 10,
      })
      .then((res) => {
        const events = res.result.items;

        if (events.length > 0) {
          // use filter to only get Zoom and Google Meet events
          // Google Meet events will have hangoutLink
          // Zoom events will have location with Zoom link
          return events.filter((event, i) => {
            return (
              event.hangoutLink !== undefined || event.location !== undefined
            );
          });
        } else {
          console.log("No upcoming events found.");
          return [];
        }
      });
  },

  // Use Gmail API to get user's inbox emails
  // only get email if the email is labeled inbox (we don't want sent emails)
  getEmails() {
    return gapi.client.gmail.users.messages
      .list({
        userId: "me",
        labelIds: "INBOX",
        maxResults: 4,
      })
      .then((res) => {
        const messages = res;
        return messages;
      })
      .then(async (messages) => {
        let promises = messages.result.messages.map(async (message) => {
          // use the message id to make another request to Gmail API to get full email info
          return await gapi.client.gmail.users.messages
            .get({
              userId: "me",
              id: message.id,
            })
            .then((res) => {
              // get email sender from headers
              let from = "";
              for (let header of res.result.payload.headers) {
                if (header.name === "From") {
                  from = header.value;
                }
              }

              // get email subject from headers
              let subject = "";
              for (let header of res.result.payload.headers) {
                if (header.name === "Subject") {
                  subject = header.value;
                }
              }

              // get email text, or just snippet if not possible to get full text
              let text = "";
              if (res.result.payload.parts) {
                let msg = res.result.payload.parts[0].body.data;
                let buff = new Buffer.from(msg, "base64");
                text = buff.toString("ascii");
              } else {
                text = res.result.snippet;
              }

              // get email unread status
              let unread = false;
              if (res.result.labelIds.includes("UNREAD")) {
                unread = true;
              }

              return { from, subject, text, unread };
            });
        });

        let emails = [];
        for await (let val of promises) {
          emails.push(val);
        }

        return emails;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  },

  // Helper function to make email body for sending new email
  makeBody(from, to, subject, message) {
    let str = [
      'Content-Type: text/plain; charset="UTF-8"\n',
      "MIME-Version: 1.0\n",
      "Content-Transfer-Encoding: 7bit\n",
      "to: ",
      to,
      "\n",
      "from: ",
      from,
      "\n",
      "subject: ",
      subject,
      "\n\n",
      message,
    ].join("");

    let encodedMail = new Buffer(str)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    return encodedMail;
  },

  // TODO: this doesn't work - get "from" email from logged-in user's profile
  getUserEmail() {
    return gapi.client.gmail.users
      .getProfile({
        userId: "me",
      })
      .then((res) => {
        console.log(res.result.emailAddress);
        return res.result.emailAddress;
      });
  },

  // Use Gmail API to send an email
  sendEmail(to, subject, message) {
    // TODO: get "from" email from logged-in user's profile
    let from = "mlumtest@gmail.com";

    let raw = Google.makeBody(from, to, subject, message);

    gapi.client.gmail.users.messages
      .send({
        userId: "me",
        resource: {
          raw: raw,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

export default Google;
