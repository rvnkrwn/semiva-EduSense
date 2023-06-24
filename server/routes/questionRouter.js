const openaiController = require('../controllers/openaiController');
const questionController = require('../controllers/questionController');
const {isLogin} = require("../middlewares/authMiddleware");
const openaiRoute = require('express').Router();
module.exports = app => {
    openaiRoute.post('/ask', openaiController.chatAI, questionController.create)

    app.use('/api/openai', openaiRoute)
}