require("dotenv").config();
const path = require("path");
const sendEmail = require("../utils/sendEmail");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.model");
const { newToken } = require("../controllers/authentication.controller");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:2345/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
        
      let user = await User.findOne({ email: profile.email })
        .lean()
        .exec();
        
    // sendEmail(
    //   "admin@lynda.com",
    //   user.email,
    //   `Welcome to Lynda learning company ${user.name}.`,
    //   `Hi! ${user.name},
    //    Please verify your email, your otp for email verification is ${user.otp}.`,
    //   `<h5>Hi! ${user.name},</h5> 
    //        <h5>Please verify your email, your otp for email verification is ${user.otp}.</h5>`,
    //   null,
    //   null,
    // ); 
      if (!user) {
        user = await User.create({
          name: profile.name,
          email: profile.email,
          password: uuidv4(),
          
        });
      }
      const token = newToken(user);
      return done(null, { user, token });

    }
  )
);
module.exports = passport;
