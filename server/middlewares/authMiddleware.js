const Model = require("../models");
const {verifyToken} = require("../utilities/jwtUtilies");
const userModel = Model.userModel;

exports.isLogin = async (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }

    const token = auth.split(' ')[1];

    try {
        const user = verifyToken(token);

        if (!user) return res.send({msg: user})
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).send({msg: 'Token is invalid'})
    }

}