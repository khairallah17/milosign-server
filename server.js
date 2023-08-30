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

});


app.listen(PORT, () => console.log(PORT))
