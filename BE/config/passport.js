const jwt = require('jsonwebtoken');
const LocalPassportStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');


module.exports = new LocalPassportStrategy({
        usernameField: 'username',
        passwordField: 'password',
        session: false,
        passReqToCallback: true
    }, (req, username, password, done) => {
        User.findOne({ username: username }).then(user => {
            if (!user) { return done(null, false) }
            if (!user.authenticate(password)) { return done(null, false) }

            const payload = {
                sub: user.id
            };

            // create a token string 
            const token = jwt.sign(payload, '734m |_|n0');

            return done(null, token, user);
        });
});