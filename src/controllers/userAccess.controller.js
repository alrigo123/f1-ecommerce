const connection = require('../config/connection');
const user_model = require('../models/user.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { use } = require('../routes/views.routes');
const controller = {}

controller.landPageRegister = (req, res) => {
    res.render('register', { head: null });
}

controller.register = async (req, res) => {
    const name = req.body.name;
    const last_name = req.body.last_name;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const repeat_password = req.body.repeatPassword
    let address = "EN TTIO";
    let img = "123456789";
    let errors = [];

    try {
        //flash errors
        if (!username || !email || !password || !repeat_password) {
            errors.push({ msg: "Please fill in all fields" });
        }

        if (password !== repeat_password) {
            errors.push({ msg: 'Passwords do not match' });
        }

        if (password.length < 6) {
            errors.push({ msg: "Password should be at least 6 characters" });
        }

        if (errors.length > 0) {
            res.render('register', {
                errors,
                head: null,
                name,
                last_name,
                username,
                email,
                password,
                repeat_password
            });
        } else {
            const pool = await connection;

            const user_find = await user_model.findUserByUsername(pool, username);
            const email_find = await user_model.findUserByEmail(pool, email);

            //verifiy if user exist
            if (user_find) {
                errors.push({ msg: 'User already taken' });
                res.render('register', {
                    errors,
                    head: null,
                    name,
                    last_name,
                    username,
                    email,
                    password,
                    repeat_password
                });
            } else if (email_find) {
                errors.push({ msg: 'Email already used' });
                res.render('register', {
                    errors,
                    head: null,
                    name,
                    last_name,
                    username,
                    email,
                    password,
                    repeat_password
                });
            } else {
                const salt = await bcrypt.genSalt(10);
                const passHash = await bcrypt.hash(password, salt);
                await user_model.registerUser(pool, name, last_name, email, username, passHash, address, img);
                req.flash("success_msg", "You are now registered and can log in");
                res.redirect('/');
            }
        }
    } catch (error) {
        console.log(error.message);
    }
}

controller.login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let errors = [];
    try {
        const pool = await connection;
        const data_user = await user_model.findUserByUsername(pool, username);
        
        const user_username = await data_user.username;
        const user_length = await user_username[0].length;

        console.log(user_username[0].length);
        console.log(user_username);
        console.log(user_length);

        if(user_length < 1 || !(await bcrypt.compare(password, data_user.password))){
            errors.push({ msg: 'Invalid username or password' });
            res.status(401).render('login', {
                errors,
                head: null,
                username,
                password
            });
        }else{
        }

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = controller