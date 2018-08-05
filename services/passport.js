var passport = require('passport');
var User = require('../models/user');
var config = require('../config');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local');

// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
    // Verify this email and password, call done with the user
    // if it is the correct email and password
    // otherwise, call done with false
    User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }

        // Compare passwords - is ´password´ equal to user.password?
        user.comparePassword(password, function (err, isMatch) {
            if (err) { return done(err, false); }
            if (!isMatch) { return done(null, false); }

            return done(null, user);
        });
    });
});

// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    // See if the user ID in the payload exists in our database
    // If it does, call done with that user
    // Otherwise, call done without a user object
    User.findOne({ _id: payload.sub, token: payload.sessionid }, function (err, user) {
        if (err) { return done(err, false); }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

// Tell passport the use this strategy
passport.use(jwtLogin);
passport.use(localLogin);