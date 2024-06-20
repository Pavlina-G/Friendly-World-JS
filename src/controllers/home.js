const { Router } = require('express');
const { login, register } = require('../services/userService');
const { createToken } = require('../services/token');
const { Animal } = require('../models/Animal');
const { User } = require('../models/User');

// TODO replace with real Router exam description

const homeRouter = Router();

homeRouter.get('/', async (req, res) => {
    // TODO add the last 3
    // register('test@mail.bg','1111','1111')
    new Animal({
        name: 'Test',
        years: '10',
        kind: 'panda',
        image: 'https//:test.img',
        need: 'testneed',
        location: 'testneed',
        description: 'testneed',
        owner: '667432f07529161efc1f5c44'
    })
    res.render('home', {title: 'Home Page'});
})

module.exports = { homeRouter };