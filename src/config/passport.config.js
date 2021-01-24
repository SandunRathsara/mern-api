const passport = require('passport');
const { User } = require('../model');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { passportStrategies } = require('../constant/general.constant');

const localOptions = {
  usernameField: 'email',
  passwordField: 'password',
};

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.LOGIN_SECRET,
};

// local strategy for login
passport.use(
  passportStrategies.LOGIN,
  new LocalStrategy(localOptions, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) return done(null, false, { message: 'User not found' });
      if (!user.comparePassword(password)) return done(null, false, { message: 'Wrong Password' });

      return done(null, user, { message: 'Logged in Successfully' });
    } catch (e) {
      return done(e);
    }
  })
);

// jwt strategy for jwt verification
passport.use(
  passportStrategies.JWT,
  new JWTStrategy(jwtOptions, async (payload, cb) => {
    try {
      // const user = await User.findOne({ email: payload.email });
      cb(null, payload);
    } catch (err) {
      return cb(err);
    }
  })
);
