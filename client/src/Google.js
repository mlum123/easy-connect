// Google module for OAuth2 to view and edit user's Google Contacts
const API_KEY = "AIzaSyDX-84f8_PZsHsUR65dmYBTaCBxwM7jYoI";
const CLIENT_ID =
  "337510426214-vr92q2qdgetu51134m3trr1oki5spdus.apps.googleusercontent.com";
const DISCOVERY_DOCS = [
  "https://people.googleapis.com/$discovery/rest?version=v1",
];
const SCOPES = "https://www.googleapis.com/auth/contacts";

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
      Google.getContacts();
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
        console.log(contacts);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

export default Google;
