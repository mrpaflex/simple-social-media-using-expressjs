const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = async (passport) => {
  passport.use(
    new LocalStrategy({
      usernameField: 'email',//this line of code is extremely important if you want users log in with email
    }, async  (email, password, done) => {
      try {
        const user = await User.findOne({email: email });
        if (!user) {
          return done(null, false, { message: 'Incorrect email address' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password' });
        }

        return done(null, user);

      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(null, err);
    }
  });
};