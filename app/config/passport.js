const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy
const store = require("store2")
const axios = require('axios')

require('dotenv').config()

const passportGoogle = () => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/callback",
        passReqToCallback:true,
    },  async (request, accessToken, refreshToken, profile, done) => {
            store("accessToken", {my_token: accessToken})
            return done(null, profile);
        }
    ))
    
    passport.serializeUser((user, done) => {
        done(null, user)
    })
    
    passport.deserializeUser((user, done) => {
        done(null, user)
    })
}

module.exports = passportGoogle
