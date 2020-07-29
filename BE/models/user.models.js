const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');

function getRequiredPropMsg(prop) {
    return `${prop} is required!`;
}

let userSchema = mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: getRequiredPropMsg('Username'),
        unique: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: getRequiredPropMsg('Password'),
        min: [8, 'The Password must be at least 8 characters in length'],
    },
    salt: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    // roles: [{ type: mongoose.Schema.Types.String  }],
});

userSchema.method({
    authenticate: function (password) {
        let hashedPassword = encryption.generateHashedPassword(this.salt, password);

        return hashedPassword === this.password;
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;