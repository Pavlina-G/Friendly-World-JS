// TODO import routers/ register routers

const { pageNotFound } = require("../controllers/404");
const { animalRouter } = require("../controllers/animal");

const { homeRouter } = require("../controllers/home");
const { userRouter } = require("../controllers/user");

function configRoutes(app) {
    
    app.use(homeRouter);
    app.use(userRouter);
    app.use(animalRouter);
    app.get('*', pageNotFound);
};

module.exports = { configRoutes };