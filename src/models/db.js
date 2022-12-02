const mongo = require('mongoose');
const config = require('../config');

mongo.connect(config.mongoose.url, config.mongoose.options);

const db = mongo.connection;

db ? console.log('Database connected successfully') : console.log('Error');

module.exports = db ;
