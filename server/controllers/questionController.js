const Model = require("../models");
const {cleanQuestion} = require("../utilities/cleanQuestionUtils");
const quizModel = Model.quizModel;

function splitQuestionString(questionString) {
    const parts = questionString.split('\n');
    const questionNo = parts[0].split('. ')[0];
    const question = parts[0].split('. ')[1];
    const options = parts.slice(1, parts.length - 1);
    const answer = parts[parts.length - 1].split(', ')[0];

    return [questionNo, question, options, answer];
}

function separateQuestions(questionsString) {
    const questionsArray = [];
    let currentIndex = 0;

    while (currentIndex < questionsString.length) {
        let questionEndIndex = questionsString.indexOf("'", currentIndex);
        let answerStartIndex = questionsString.indexOf("'", questionEndIndex + 1);
        let answerEndIndex = questionsString.indexOf("'", answerStartIndex + 1);

        if (questionEndIndex === -1 || answerStartIndex === -1 || answerEndIndex === -1) {
            break;
        }

        const question = questionsString.substring(currentIndex, answerEndIndex + 1);
        questionsArray.push(splitQuestionString(question));

        currentIndex = answerEndIndex + 3;
    }

    return questionsArray;
}


exports.create = async (req, res) => {
    try {
        const questions = req.user;
        const {code, name, description, teacher, students} = req.body;

        const payload = {
            code: code,
            name: name,
            description: description,
            teacher: teacher,
            questions: questions,
            students: []
        }
        await quizModel.create(payload).then(() => {
            res.send({msg: "Successfully Created"});
        }).catch((error) => {
            res.send({msg: "Error Server", error})
        })
    } catch (error) {
        res.send({msg: "Error Server", error})
    }
}