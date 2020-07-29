const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');

module.exports = (req, res, next) => {
    if (!req.headers.authentication) {
        return res.status(401).send({ message: 'Don\'t forget the header' })
    }

    // get the last part from a authentication header string like "bearer token-value"
    const token = req.headers.authentication.split(' ')[1];

    // decode the token using a secret key-phrase
    return jwt.verify(token, '734m |_|n0', (err, decoded) => {
        // the 401 code is for unauthorized status
        if (err) {
            return res.status(401).end()
        }

        const userId = decoded.sub;

        User.findById(userId).then(user => {
            if (!user) {
                return res.status(404).send({ message: 'User no longer exists.' });
            }
            req.user = user;

            return next()
        });

    })
};