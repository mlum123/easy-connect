// GroupMe module
// functions to view user's groups, messages in groups, send messages
const ACCESS_TOKEN = "90bdbbf061310139d4cd1e7f1bdbe494";

const groupMe = require("groupme").Stateless;

const GroupMe = {
  // get basic info about user
  getUserInfo() {
    return groupMe.Users.me
      .Q(ACCESS_TOKEN)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // get user's groups
  getGroups() {
    return groupMe.Groups.index
      .Q(ACCESS_TOKEN)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // get messages in one of user's groups
  getMessages(groupId) {
    return groupMe.Messages.index
      .Q(ACCESS_TOKEN, groupId, "before_id:")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // send messages to a group
  sendMessage(groupId, userMessage) {
    /* TODO - choose which options to allow
    let opts = {
      message: {
        source_guid: "GUID",
        text: "I'm doing well! How are you?",
        attachments: [
          {
            type: "location",
            name: "GroupMe HQ",
            lat: "40.738206",
            lng: "-73.993285",
          },
          { type: "split", token: "SPLIT_TOKEN" },
          {
            type: "emoji",
            placeholder: "☃",
            charmap: [
              [1, 42],
              [2, 34],
            ],
          },
        ],
      },
    };
    */
    let opts = {
      message: {
        source_guid: "GUID",
        text: userMessage,
      },
    };

    return groupMe.Messages.create
      .Q(ACCESS_TOKEN, groupId, opts)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

export default GroupMe;
