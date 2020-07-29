const controllers = require('../controllers/index.controller');
const permissions = require('./permissions');
const authenticate = require('../utilities/authentication');

module.exports = (app) => {
    app.post('/user/register', controllers.user.register.post);
    app.post('/user/login', controllers.user.login.post);
    app.post('/user/logout', controllers.user.logout);
};