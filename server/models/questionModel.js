const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: [String],
    answer: [String]
}, {
    timestamps: true
});

const question = mongoose.model('Question', questionSchema);

module.exports = question;
