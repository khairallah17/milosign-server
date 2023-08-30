const express = require("express")
const app = express()
const passport = require('passport');
const session = require("express-session")
const passportGoogle = require("./config/passport")
const store = require("store2")
const { google } = require('googleapis');
require("./config/passport")
require('dotenv').config()

const PORT = process.env.PORT

app.use(session({
    secret: process.env.SESSION_KEY1,
    resave: false,
    saveUninitialized: false
  }))
app.use(passport.initialize())
app.use(passport.session())

passportGoogle()

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
  if (req.isAuthenticated()) {
    try {
      // Get the user's OAuth token from the session
      const accessToken = store('accessToken').my_token;

      // Create the authenticated Google API client
      const auth = new google.auth.OAuth2();
      auth.setCredentials({ access_token: accessToken });

      // Fetch the users in the domain
      const service = google.admin({ version: 'directory_v1', auth });
      const response = await service.users.list({
        customer: 'my_customer',
        maxResults: 10,
        orderBy: 'email',
      });

      const users = response.data.users;
      if (!users || users.length === 0) {
        console.log('No users found.');
        res.send('No users found.');
      } else {
        console.log('Users:');
        users.forEach((user) => {
          console.log(`${user.primaryEmail} (${user.name.fullName})`);
        });
        res.send(users);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).send('Error fetching user data');
    }
  } else {
    console.log('User not authenticated.');
    res.redirect('/');
  }
});


app.listen(PORT, () => console.log(`listening on port : ${PORT}`))
