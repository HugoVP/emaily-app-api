const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const url = require('url');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: url.resolve(
        process.env.GOOGLE_REDIRECT_URI,
        '/auth/google/callback'
      ),
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (!existingUser) {
        /* We don't have a record with the given profile Id, make a new record */
        const user = await new User({ googleId: profile.id }).save();
        done(null, user);
      }

      /* We already have a record with the given profile Id */
      return done(null, existingUser);
    }
  )
);
