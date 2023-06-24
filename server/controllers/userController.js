const Model = require("../models");
const userModel = Model.userModel;
const {hashing, comparing} = require("../utilities/encryptUtils");
const {findUser} = require("../utilities/userValidationUtils");
const {generateToken} = require("../utilities/jwtUtilies");

exports.register = async (req,res) => {
    const {full_name, email, password, role} = req.body;
    const user = await findUser(email)
    if (user) return res.send({msg: 'Email already exits'});
    const passwordHash = await hashing(password);
    try {
        await userModel.create({
            full_name,
            email,
            password: passwordHash,
            status: 'pending',
            role: role
        })
        res.send({msg: 'Successfully Register'})
    } catch (error) {
        res.send({msg: error.message})
    }
}

exports.login = async (req,res) => {
    const {email, password} = req.body;
    try {
        const user = await findUser(email)
        if (!user) return res.send({msg: 'Email not registered'});
        if (!await comparing(password, user.password)) return res.send({msg: 'Password is Invalid'});

        const id = user.id;
        const payload = {
            id: id
        }
        const token = await generateToken(payload);

        if (token) {
            return res.send({msg: 'successfully login', token})
        }
    } catch (error) {
        return res.send({msg: 'error', error});
    }
}

exports.findAllUser = async (req, res) => {
    try {
        const users = await userModel.find().select('-password');
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch users', error });
    }
}

exports.update = async (req, res) => {
    const {id} = req.user;
    const {password, ...newData} = req.body;
    try {
        await userModel.findByIdAndUpdate(id,newData)
        res.status(200).send({ message: 'Successful to update users' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to update users', error });
    }
}