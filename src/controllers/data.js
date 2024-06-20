const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { isUser } = require('../middlewares/guards');
const {} = require('../services/dataService');
const { parseError } = require('../util');

// TODO change as the exam description data

const dataRouter = Router();

dataRouter.get('/create', isUser(), async (req, res) => {
    res.render('create', {title: ''});
});


module.exports = {
    dataRouter
}
