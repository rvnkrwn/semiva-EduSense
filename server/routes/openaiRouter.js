const openaiController = require('../controllers/openaiController');
const {isLogin} = require("../middlewares/authMiddleware");
const openaiRoute = require('express').Router();
module.exports = app => {
    openaiRoute.post('/ask', openaiController.chatAI)

    app.use('/api/openai', openaiRoute)
}