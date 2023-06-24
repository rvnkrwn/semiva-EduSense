require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

exports.generateToken = (payload) => {
    const token = jwt.sign(payload, secret, { expiresIn: '24h' });
    return token;
};

exports.verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (error) {
        throw new Error('Invalid token');
    }
};
