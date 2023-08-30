// const fs = require('fs').promises;
// const path = require('path');
// const process = require('process');
// const {authenticate} = require('@google-cloud/local-auth');
// const {google} = require('googleapis');

// // If modifying these scopes, delete token.json.
// const SCOPES = ['https://www.googleapis.com/auth/admin.directory.user'];
// // The file token.json stores the user's access and refresh tokens, and is
// // created automatically when the authorization flow completes for the first
// // time.
// const TOKEN_PATH = path.join(process.cwd(), 'token.json');
// const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

// /**
//  * Reads previously authorized credentials from the save file.
//  *
//  * @return {Promise<OAuth2Client|null>}
//  */
// async function loadSavedCredentialsIfExist() {
//   try {
//     const content = await fs.readFile(TOKEN_PATH);
//     const credentials = JSON.parse(content);
//     return google.auth.fromJSON(credentials);
//   } catch (err) {
//     return null;
//   }
// }

// /**
//  * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
//  *
//  * @param {OAuth2Client} client
//  * @return {Promise<void>}
//  */
// async function saveCredentials(client) {
//   const content = await fs.readFile(CREDENTIALS_PATH);
//   const keys = JSON.parse(content);
//   const key = keys.installed || keys.web;
//   const payload = JSON.stringify({
//     type: 'authorized_user',
//     client_id: key.client_id,
//     client_secret: key.client_secret,
//     refresh_token: client.credentials.refresh_token,
//   });
//   await fs.writeFile(TOKEN_PATH, payload);
// }

// /**
//  * Load or request or authorization to call APIs.
//  *
//  */
// async function authorize() {
//   let client = await loadSavedCredentialsIfExist();
//   if (client) {
//     return client;
//   }
//   client = await authenticate({
//     scopes: SCOPES,
//     keyfilePath: CREDENTIALS_PATH,
//   });
//   if (client.credentials) {
//     await saveCredentials(client);
//   }
//   return client;
// }

// /**
//  * Lists the first 10 users in the domain.
//  *
//  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//  */
// async function listUsers(auth) {
//   const service = google.admin({version: 'directory_v1', auth});
//   const res = await service.users.list({
//     customer: 'my_customer',
//     maxResults: 10,
//     orderBy: 'email',
//   });

//   const users = res.data.users;
//   if (!users || users.length === 0) {
//     console.log('No users found.');
//     return;
//   }

//   console.log('Users:');
//   users.forEach((user) => {
//     console.log(`${user.primaryEmail} (${user.name.fullName})`);
//   });
// } 

// authorize().then(listUsers).catch(console.error);

// app.js
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const session = require('express-session');
const { google } = require('googleapis');
const store = require("store2")

require('dotenv').config();

const app = express();
const port = 3000;

// Set up session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

// Set up Passport.js middleware
app.use(passport.initialize());
app.use(passport.session());

// Replace the placeholder values with your actual credentials
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// Configure Passport.js with the Google OAuth 2.0 strategy
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/callback', // The callback URL after successful login
  passReqToCallback: true,
}, (request, accessToken, refreshToken, profile, done) => {
  // Save the user's OAuth token to the session for future API calls
  store("accessToken",{my_token: accessToken})
  return done(null, profile);
}));

// Serialize and deserialize user information in the session
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Define your API routes or views here
// For simplicity, we'll just use the example from the previous response

app.get('/', (req, res) => {
  res.send("<button><a href='/auth'>Login With Google</a></button>");
});

app.get('/auth',
  passport.authenticate('google', { scope: ['email', 'profile', 'https://www.googleapis.com/auth/admin.directory.user'] })
);

app.get('/auth/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to user list page
    res.redirect('/users');
  }
);

// User list page
app.get('/users', async (req, res) => {
  // Check if the user is authenticated

});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


