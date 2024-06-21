const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { isUser } = require('../middlewares/guards');

const { parseError } = require('../util');
const { createAnimal, donateAnimal, getAnimalById, updateAnimal, deleteAnimalById } = require('../services/animalService');


const animalRouter = Router();

animalRouter.get('/add', isUser(), async (req, res) => {
    res.render('create', { title: 'Add Animal' });
});

animalRouter.post('/add', isUser(),
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
    body('years').trim().isInt({ min: 1, max: 100 }).withMessage('Enter a valid year between 1 and 100'),
    body('kind').trim().isLength({ min: 3 }).withMessage('Kind must be at least 3 characters long'),
    body('image').trim().isURL({ require_tld: false }).withMessage('The image must be a valid URL'),
    body('need').trim().isLength({ min: 3, max: 20 }).withMessage('The need must be between 3 and 20 characters long'),
    body('location').trim().isLength({ min: 5, max: 15 }).withMessage('The location must be between 5 and 15 characters long'),
    body('description').trim().isLength({ min: 5, max: 50 }).withMessage('The description must be between 5 and 50 characters long'),

    async (req, res) => {
        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }
            const data = req.body;
            const userId = req.user._id

            await createAnimal(data, userId);

            res.redirect('/animals');

        } catch (err) {
            res.render('create', { data: req.body, errors: parseError(err).errors });
        }

    }
);

animalRouter.get('/edit/:id', isUser(), async (req, res) => {
    const animal = await getAnimalById(req.params.id)

    if (!animal) {
        res.render('404')
        return;
    }

    const isOwner = req.user._id == animal.owner.toString();

    if (!isOwner) {
        res.redirect('/login');
        return;
    }

    res.render('edit', { data: animal });
});

animalRouter.post('/edit/:id', isUser(),
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
    body('years').trim().isInt({ min: 1, max: 100 }).withMessage('Enter a valid year between 1 and 100'),
    body('kind').trim().isLength({ min: 3 }).withMessage('Kind must be at least 3 characters long'),
    body('image').trim().isURL({ require_tld: false }).withMessage('The image must be a valid URL'),
    body('need').trim().isLength({ min: 3, max: 20 }).withMessage('The need must be between 3 and 20 characters long'),
    body('location').trim().isLength({ min: 5, max: 15 }).withMessage('The location must be between 5 and 15 characters long'),
    body('description').trim().isLength({ min: 5, max: 50 }).withMessage('The description must be between 5 and 50 characters long'),

    async (req, res) => {
        const animalId = req.params.id;
        const userId = req.user._id;

        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }
            const data = req.body;

            await updateAnimal(animalId, userId, data);

            res.redirect('/animals/' + animalId);

        } catch (err) {
            res.render('edit', { data: req.body, errors: parseError(err).errors });
        }

    }
);

animalRouter.get('/delete/:id', isUser(),

    async (req, res) => {
        const animalId = req.params.id;
        const userId = req.user._id;

        try {
            await deleteAnimalById(animalId, userId);

        } catch (err) {
            if (err.message == 'Access denied') {
                res.redirect('/login');
                return;
            }

        }
        res.redirect('/animals');

    }
);

animalRouter.get('/donate/:id', isUser(), async (req, res) => {
    const animalId = req.params.id;
    const userId = req.user._id;

    try {
        await donateAnimal(animalId, userId);
        res.redirect('/animals/' + animalId);

    } catch (err) {
        res.redirect('/');
    }

})


module.exports = {
    animalRouter
}
