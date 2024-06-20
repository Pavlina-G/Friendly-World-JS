// TODO import routers/ register routers

const { pageNotFound } = require("../controllers/404");
const { homeRouter } = require("../controllers/home");

function configRoutes(app) {
    
    app.use(homeRouter);
    // app.use(userRouter);
    
    app.get('*', pageNotFound);
};

module.exports = { configRoutes };