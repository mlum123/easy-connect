// Google module for OAuth2 to view and edit user's Google Contacts
const API_KEY = "AIzaSyDX-84f8_PZsHsUR65dmYBTaCBxwM7jYoI";
const CLIENT_ID =
  "337510426214-vr92q2qdgetu51134m3trr1oki5spdus.apps.googleusercontent.com";
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

  // Get user's contacts' names, phone nums, emails
  getContacts() {
    return gapi.client.people.people.connections
      .list({
        resourceName: "people/me",
        personFields: "names,phoneNumbers,emailAddresses",
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

  // Get upcoming Zoom and Google Meet events on user's household calendar
  getEvents() {
    // use timeMin to specify only getting events that happened / are happening on Monday forward
    return gapi.client.calendar.events
      .list({
        calendarId: "primary",
        showDeleted: false,
        singleEvents: true,
        orderBy: "startTime",
      })
      .then((res) => {
        const events = res.result.items;

        if (events.length > 0) {
          // use filter to only get Zoom and Google Meet events
          return events.filter((event, i) => {
            let eventTime = event.start.dateTime;

            return true;
          });
        } else {
          console.log("No upcoming events found.");
          return [];
        }
      });
  },

  // Get user's emails
  getEmails() {
    return gapi.client.gmail.users.messages
      .list({
        userId: "me",
      })
      .then((res) => {
        const messages = res;
        return messages;
      })
      .then(async (messages) => {
        let promises = messages.result.messages.map(async (message) => {
          return await gapi.client.gmail.users.messages
            .get({
              userId: "me",
              id: message.id,
            })
            .then((res) => {
              let text = "";

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
              if (res.result.payload.parts) {
                let msg = res.result.payload.parts[0].body.data;
                let buff = new Buffer.from(msg, "base64");
                text = buff.toString("ascii");
              } else {
                text = res.result.snippet;
              }
              return { from, subject, text };
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
};

export default Google;
