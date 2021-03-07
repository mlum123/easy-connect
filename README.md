# Simply Connect

### talking made easy!

#### SF Hacks 2021

_Demo Video: BLANK_

With many working and learning virtually due to the coronavirus pandemic, we're using more digital platforms than ever to stay connected — there's Zoom, Google Meet, email, texting, and GroupMe, among a plethora of other services. It can be confusing, time-consuming, and difficult to keep up to date on all of these apps, especially for those like the older generation who may not catch onto new technologies easily and are feeling the most isolated due to their vulnerability to COVID-19.

That's where Simply Connect comes in: Simply Connect is a web application made with React and Express for SF Hacks 2021, and it's a one-stop communications hub for all your digital platforms. Simply Connect uses OAuth2.0 authentication to allow users to sign in via their Google accounts, giving Simply Connect access to their Google Contacts, Gmail emails, and Google Calendars.

Once you log in, Simply Connect displays your Google Contacts using the Google People API. You're able to filter your contacts by name to find phone numbers and emails. You can also send texts to any phone number from the Simply Connect web app via the Twilio SMS API, which is really helpful for PC users who don't have quick access to texting on their laptops and may need to send a quick text while they're in a virtual meeting.

Through the Gmail API, Simply Connect also shows your most recent inbox emails and allows you to reply to emails without ever leaving the web app. Additionally, you can view your upcoming Zoom and Google Meet meetings, which are imported directly from your Google Calendar.

Furthermore, Simply Connect is integrated with GroupMe through the GroupMe API. You can view all of your GroupMe group chats and their latest messages, in addition to responding to GroupMe group chats directly from Simply Connect.

I see so many possibilities for Simply Connect: we can integrate more APIs for different chatting and social media services to broaden its range, allow users to choose which apps they want to integrate into Simply Connect, make Simply Connect into a Chrome Extension for even more convenient and easy access, and do so much more.

Communicating virtually shouldn't be as hard as it is. Let's simply connect!

## Technologies Used

React (frontend), Express (backend for communicating with Twilio SMS API), Reactstrap for using Bootstrap components in React, JavaScript, CSS, Google People API, Gmail API, Google Calendar API, Twilio SMS API, GroupMe API, Node.js

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The express server for making requests to Twilio SMS API will be running on [http://localhost:5000](http://localhost:5000).

The page will reload if you make edits.\
