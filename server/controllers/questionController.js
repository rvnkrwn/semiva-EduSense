const Model = require("../models");
const quizModel = Model.quizModel;

function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = Math.floor(Math.random() * 3) + 6; // Panjang string antara 6 hingga 8 karakter
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }

    return result;
}


exports.create = async (req, res) => {
    try {
        const response = req.user;
        const { name, description, teacher, students } = req.body;
        const code = generateRandomString();
        const payload = {
            code,
            name,
            description,
            teacher,
            questions: JSON.parse(response),
            students,
        };
        await quizModel.create(payload);
        res.status(200).json({ msg: 'Quiz created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Failed to create quiz', error });
    }
};

exports.findAllQuiz = async (req, res) => {
    try {
        const response = await quizModel.find();
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch quizzes', error });
    }
}

exports.findQuiz = async (req, res) => {
    try {
        const {id} = req.params
        // Send the response data to the client
        const response = await quizModel.findById(id)
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch quizzes', error });
    }
}

exports.correctAnswers = async (req, res, next) => {
    try {
        const { id, quizId } = req.params;
        const data = req.body;

        // Mendapatkan data kuis dari database
        const quiz = await quizModel.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Kuis tidak ditemukan' });
        }
        const questions = quiz.questions;
        let grade = 0;
        questions.forEach((question, i) => {
            if (question.answer && data[i] && question.answer === data[i].answer) {
                grade++;
            }
        });

        req.user = {
            id: id,
            quizId: quizId,
            grade: grade,
        }
        next();
    } catch (error) {
        console.error('Error while grading quiz:', error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mengoreksi kuis' });
    }
};
