'use strict';
// Importing Passport, strategies, and config
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import config from './main';

import User from '../models/user';

const jwtOptions = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // Telling Passport where to find the secret
  secretOrKey: config.secret
};

// Setting up JWT login strategy
const jwtLogin = new Strategy(jwtOptions, function (payload, done) {
  User.findById(payload._id, function (err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

const initializePassaport = ()=> {
  passport.use('jwt', jwtLogin);
  return passport.initialize();
};


export default initializePassaport;