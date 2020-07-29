const User = require('../models/User');
const encryption = require('../utilities/encryption');
const passport = require('passport');

module.exports = {
    register: {
        post: (req, res) => {
            let userData = req.body;
            if (!userData.username) {
                return res.status(403).send({ message: 'Cannot register user with blank username!' });
            }
            if (userData.password && userData.password !== userData.confirmedPassword) {
                return res.status(403).send({ message: 'Passwords do not match' });
            }

            let salt = encryption.generateSalt();
            userData.salt = salt;

            if (userData.password) {
                userData.password = encryption.generateHashedPassword(salt, userData.password);
            }
            User.find({ username: userData.username }).then(existingUser => {
                if (existingUser.length === 0) {
                    User.create(userData)
                        .then(user => {
                            //TODO: check if user exist
                            res.status(200).send({ success: true, message: 'You successfully registered user now Please login' });
                        })
                        .catch(error => {
                            userData.error = error;
                            res.status(404).send({ error: error });
                        });

                    return;
                }

                res.status(403).send({ message: 'That username is already registered. Please pick another. '});
            })

        },
    },
    login: {
        get:(req, res, next) => {
            res.sendFile(path.join(__dirname + '/index.html'));
        },
        post: (req, res, next) => {
            let userData = req.body;

            User.findOne({ username: userData.username }).then(user => {
                if (!user || !user.authenticate(userData.password)) {
                    return res.status(403).send({ message: 'Wrong credentials' });
                }
                
                return passport.authenticate('passport', (err, token, userData) => {
                    if (err) {
                        if (err.name === 'IncorrectCredentialsError') {
                            return res.status(200).json({
                                success: false,
                                message: err.message
                            });
                        }

                        return res.status(200).json({
                            success: false,
                            message: 'Could not process the form.'
                        });
                    }

                    return res.json({
                        success: true,
                        message: 'You have successfully logged in!',
                        token,
                        user: userData
                    });
                })(req, res, next);
            });
        },
    },
    logout: (req, res) => {
        req.logout();
        res.status(200).end();
    }
};