const Model = require("../models");
const {
  cleanQuestion
} = require("../utilities/cleanQuestionUtils");
const questionModel = Model.questionModel;

// exports.create = async (req, res) => {
//     const data = req.user;
//     const questions = cleanQuestion(data);
//     res.send({questions: questions});
// }

exports.create = async (req, res) => {
  // const questions = req.user;
  const data = req.user;
  res.send(data);
  const cleanedData = data.questions.replace(/\n/g, ' ');

  // Memisahkan setiap pertanyaan menggunakan regex
  const questionRegex = /\d+\.\s(.*?)\sAnswer:\s(.*?)\s/g;
  const questions = [];
  let match;
  while (match = questionRegex.exec(cleanedData)) {
    const question = match[1];
    const answer = match[2];

    // Mengubah opsi jawaban menjadi array
    const options = question.match(/[A-E]\.\s(.*?)(?=\s[A-E]\.|$)/g);
    questions.push({
      question,
      options,
      answer
    });
  }
  res.send({
    questions: questions
  });
};