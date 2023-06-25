const openaiController = require('../controllers/openaiController');
const questionController = require('../controllers/questionController');
const {isLogin} = require("../middlewares/authMiddleware");
const quizRoute = require('express').Router();

module.exports = app => {

    quizRoute.post('/generate', isLogin, openaiController.chatAI, questionController.create);
    quizRoute.get('/find-all', isLogin,questionController.findAllQuiz);

    app.use('/api/quiz', quizRoute)
}