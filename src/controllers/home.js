const { Router } = require('express');
const { login, register } = require('../services/userService');
const { createToken } = require('../services/token');
const { Animal } = require('../models/Animal');
const { User } = require('../models/User');
const { getLastThreeAnimals, getAllAnimals } = require('../services/animalService');

// TODO replace with real Router exam description

const homeRouter = Router();

homeRouter.get('/', async (req, res) => {
    const animals = await getLastThreeAnimals();

    res.render('home', {title: 'Home Page', animals});
})

homeRouter.get('/animals', async (req, res) => {
    const animals = await getAllAnimals();

    res.render('dashboard', {title: 'Dashboard', animals});
})

module.exports = { homeRouter };