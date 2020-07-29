
const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');
// const session = require('express-session');
const passport = require('passport');
const passportStrategy = require('./passport');
const cors = require('cors');

module.exports = (app, config) => {
    "use strict";
    app.set('view engine', 'pug');

    // app.use(bodyParser.urlencoded({ extended: false }));
    // app.use(bodyParser.json());

    // Module to Allow Access Control Origin
    app.use(cors());

    app.use(express.static('public'))

    passport.use('passport', passportStrategy);

    app.use((req, res, next) => {
        if (req.user) {
            res.locals.user = req.user;
        }

        next();
    });

    // Configure middleware for parsing forms
    //app.use(bodyParser.urlencoded({ extended: true }));
};