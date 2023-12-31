const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    no: {
        type: Number,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        required: true
    }],
    answer: {
        type: String,
        required: true
    }
});

const quizSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 8,
        validate: {
            validator: function (value) {
                // Regular expression to match uppercase letters and random numbers
                return /^[A-Z0-9]+$/.test(value);
            },
            message: 'Code must consist of uppercase letters and random numbers only'
        }
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
    },
    questions: [questionSchema],
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }]
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
