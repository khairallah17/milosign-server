const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy
const axios = require('axios')

require('dotenv').config()

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/callback",
    passReqToCallback:true,
},  async (request, accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    }
))
