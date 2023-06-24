const mongoose = require('mongoose');
const db = require('../configs/database');

module.exports = {
    mongoose,
    url: db.url,
    userModel: require('./userModel'),
    quizModel: require('./quizModel'),
}