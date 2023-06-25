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
        res.status(200).json({ message: 'Quiz created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create quiz', error });
    }
};


exports.correctAnswers = async (req, res) => {
    const { quizId, studentId } = req.params;

    try {
        // Cek apakah quiz dengan ID yang diberikan ada dalam database
        const quiz = await quizModel.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        // Cek apakah student dengan ID yang diberikan ada dalam array students
        const studentIndex = quizModel.students.findIndex(student => student.toString() === studentId);
        if (studentIndex === -1) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Mengambil pertanyaan dan jawaban dari body request
        const { answers } = req.body;

        // Mengoreksi jawaban
        const correctedAnswers = quizModel.questions.map((question, index) => {
            const studentAnswer = answers[index];
            return {
                question: question.question,
                studentAnswer,
                correctAnswer: question.answer,
                isCorrect: studentAnswer === question.answer
            };
        });

        // Mengupdate array students dengan hasil koreksi jawaban
        quizModel.students[studentIndex].correctedAnswers = correctedAnswers;

        // Menyimpan perubahan ke database
        await quizModel.save();

        res.json({ message: 'Answers corrected successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}
  