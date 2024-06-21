const { Router } = require('express');
const { login, register } = require('../services/userService');
const { createToken } = require('../services/token');
const { Animal } = require('../models/Animal');
const { User } = require('../models/User');
const { getLastThreeAnimals, getAllAnimals, getAnimalById, searchAnimal } = require('../services/animalService');

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

homeRouter.get('/animals/:id', async (req, res) => {
    const animal = await getAnimalById(req.params.id);

    if (!animal) {
        res.render('404');
        return;
    }

    const isOwner = req.user?._id == animal.owner.toString();
    const hasDonated = Boolean(animal.donations.find(d => req.user?._id == d.toString()));

    res.render('details', {title: 'Animal', animal, isOwner, hasDonated});
});

homeRouter.get('/search', async (req, res) => {
    console.log(req.query);

    const { location } = req.query;
    const animals = await searchAnimal(location)

    res.render('search', { animals, location } )

})


module.exports = { homeRouter };    