const Model = require("../models");
const quizModel = Model.quizModel;




exports.create = async (req, res) => {
    try {
        const response = req.user;
        const { code, name, description, teacher, students } = req.body;
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
        // Send the response data to the client
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
        const { data } = req.body;

        // Mendapatkan data kuis dari database
        const quiz = await quizModel.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Kuis tidak ditemukan' });
        }

        const correctedAnswers = {};

        // Melakukan pengoreksian jawaban
        for (const answerData of data) {
            const { questionId, answer } = answerData;

            // Mencari pertanyaan berdasarkan ID
            const question = quiz.questions.find((q) => q._id.toString() === questionId);
            if (!question) {
                return res.status(400).json({ message: `Pertanyaan dengan ID ${questionId} tidak ditemukan` });
            }

            // Membandingkan jawaban dengan jawaban yang benar
            const isCorrect = question.answer === answer;
            correctedAnswers[questionId] = isCorrect;
        }

        // Mengirim hasil pengoreksian
        res.status(200).json({ correctedAnswers });
    } catch (error) {
        console.error('Error while grading quiz:', error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mengoreksi kuis' });
    }
};
