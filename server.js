const express = require("express")
const app = express()
const passport = require('passport');
const session = require("express-session")
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

app.get('/' , (req, res) => {
    res.send("<button><a href='/auth'>Login With Google</a></button>")
})

app.get("/auth", passport.authenticate("google", {
    scope: ["email", "profile"]
}))

app.get('/auth/callback', (req, res, next) => {
    console.log(req.headers); // Add this line
    passport.authenticate('google', {
      successRedirect: '/auth/callback/success',
      failureRedirect: '/auth/callback/failure',
    })(req, res, next);
  }
)

app.get('/auth/callback/success', async (req, res) => {
    if (!req.user)
        res.redirect('/auth/callback/failure')
    try {
      // console.log(req)
    } catch (err) {
      return res.status(500).json({message: err.message})
    }
    res.send("Welcome " + req.user.email)
})

app.get("/auth/callback/failure", (req, res) => {
    res.send("you are not authenticated")
})

app.listen(PORT, () => console.log(PORT))
