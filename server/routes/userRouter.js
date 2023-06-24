const userController = require('../controllers/userController');
const {isLogin} = require("../middlewares/authMiddleware");
const userRoute = require('express').Router();
module.exports = app => {
    userRoute.post('/register', userController.register)
    userRoute.post('/login', userController.login)

    userRoute.get('/get-all-user', isLogin,userController.findAllUser);

    userRoute.put('/update', isLogin,userController.update);
    app.use('/api/user', userRoute)
}