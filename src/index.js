const express = require('express');
const { configDatabase } = require('./config/database');
const { configHbs } = require('./config/hbs');
const { configExpress } = require('./config/express');
const { configRoutes } = require('./config/routes');
const { register } = require('./services/userService');
const { createToken, verifyToken } = require('./services/token');


async function start() {
    const app = express();

    await configDatabase();
    configHbs(app);
    configExpress(app);
    configRoutes(app);

    app.listen(3000, () => {
        console.log('Server started on http://localhost:3000');
    })
}

start();


