const mongoose = require('mongoose');
const dbConfig = require('./database.config.js');
const logger = require('./logger.js');

// Connecting to the database
exports.dbConnection = () =>{
    mongoose.connect(dbConfig.url, {
        useNewUrlParser: true
    }).then(() => {
        logger.info("Successfully connected to the database"); 
        console.log("Successfully connected to the database");   
    }).catch(err => {
        logger.error('Could not connect to the database. Exiting now...', err);
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
}