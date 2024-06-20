const mongoose = require("mongoose");

require('dotenv').config();

require('../models/User');
require('../models/Animal');


async function configDatabase() {

    const connectionString = process.env.MONGODB;
    
    await mongoose.connect(connectionString);

    console.log('Database connected');
}

module.exports = { configDatabase };