const openaiController = require('../controllers/openaiController');
const questionController = require('../controllers/questionController');
const {isLogin} = require("../middlewares/authMiddleware");
const quizRoute = require('express').Router();

module.exports = app => {

    quizRoute.post('/generate', isLogin, openaiController.chatAI, questionController.create);
    quizRoute.get('/find-all', isLogin,questionController.findAllQuiz);
    quizRoute.get('/:id', isLogin,questionController.findQuiz);

    quizRoute.post('/submit/:id/:quizId', isLogin,questionController.correctAnswers);

    app.use('/api/quiz', quizRoute)
}