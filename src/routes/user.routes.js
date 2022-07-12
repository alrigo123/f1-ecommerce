const express = require('express');
const user_controller = require('../controllers/userAccess.controller')

const route = express.Router();

route.get('/register', user_controller.landPageRegister)
route.post('/login', user_controller.login);
route.post('/register',user_controller.register);

module.exports = route;