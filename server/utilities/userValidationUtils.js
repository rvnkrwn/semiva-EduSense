const Model = require("../models");
const userModel = Model.userModel;

exports.findUser = (email) => {
    return userModel.findOne({email: email});
}