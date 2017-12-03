// Importing Passport, strategies, and config
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const config = require('./main');

const User = require('../models/user');


const jwtOptions = {
    // Telling Passport to check authorization headers for JWT
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // Telling Passport where to find the secret
    secretOrKey: config.secret
};

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    User.findById(payload._id, function(err, user) {
        if (err) { return done(err, false); }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

passport.use(jwtLogin);
