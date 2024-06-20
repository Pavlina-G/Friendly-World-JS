const { Router } = require('express');
const { login, register } = require('../services/userService');
const { createToken } = require('../services/token');
const { isGuest } = require('../middlewares/guards');
const { body, validationResult } = require('express-validator');
const { parseError } = require('../util');

const userRouter = Router();

userRouter.get('/register', isGuest(), (req, res) => {
    res.render('register', {title: 'Register'});
});


userRouter.post(
    '/register',
    isGuest(),
    //Adding validation
    body('email').trim().isEmail().isLength({ min: 10 }).withMessage('Please enter a valid email 10 charachters long'),
    body('password').trim().isLength({ min: 4}).withMessage('Password must be at least 4 characters long'),
    body('repass').trim().custom((value, { req }) => value == req.body.password).withMessage('Passwords don\'t match'),
    async (req, res) => {
        const { email, password } = req.body;

        try {

            const result = validationResult(req);

            if (result.errors.length) {
                throw result.errors;
            }

            const user = await register(email, password);
            const token = createToken(user);

            res.cookie('token', token, { httpOnly: true });
            res.redirect('/');
        } catch (err) {
            res.render('register', { data: { email }, errors: parseError(err).errors })
        }
    }
);

userRouter.get('/login', isGuest(), (req, res) => {
    res.render('login');
});


userRouter.post(
    '/login',
    isGuest(),
    body('email').trim(),
    body('password').trim(),
    async (req, res) => {
        const { email, password } = req.body;

        try {

            const user = await login(email, password);
            const token = createToken(user);

            res.cookie('token', token, { httpOnly: true });
            res.redirect('/');
        } catch (err) {
            res.render('login', { data: { email }, errors: parseError(err).errors })
        }
    }
);


userRouter.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = {
    userRouter
}