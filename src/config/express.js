const express = require('express');
const cookieParser = require('cookie-parser');
const { session } = require('../middlewares/session');

require('dotenv').config();

function configExpress(app) {
    app.use(cookieParser(process.env.COOKIE_SECRET));
    // TODO add session
    app.use(session());
    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));

}

module.exports = { configExpress };