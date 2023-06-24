const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    school: {
        type: String
    },
    province: {
        type: String
    },
    city: {
        type: String
    },
    district: {
        type: String
    },
    village: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'teacher', 'student'],
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'pending'],
        required: true
    },
    selectedQuiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    },
    quizResults: {
        type: Array
    },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
