const connection = require('../config/connection');
const user_model = require('../models/user.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
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
        connection.query('SELECT * FROM user WHERE username = ?', [username], async (err, result) => {
            if (err) throw console.log(err);

            if (result.length == 0 || !(await bcrypt.compare(password, result[0].password))) {
                errors.push({ msg: 'Invalid username or password' });
                res.redirect('/');
            } else {
                const id_user = result[0].id_user;
                const token = jwt.sign({ id_user: id_user }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
                const cookie_options = {
                    httpOnly: true,
                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000)
                };
                res.cookie('jwt', token, cookie_options);
                res.redirect('/');
            }
        })

    } catch (error) {
        console.log(error.message);
    }
}

controller.isAuthenticated = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            // var decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);

            const theToken = req.cookies.jwt.split(' ')[1];
            const decoded = jwt.verify(theToken, process.env.JWT_SECRET);

            // const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET,)

            connection.query('SELECT * FROM user WHERE id_user = ?', [decoded.id_user], async (err, result) => {
                if (err) throw console.log(err);

                if (!result) {
                    return next()
                }
                req.user = result[0];
                return next();
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    } else {
        res.redirect('/');
    }
}

controller.logout = (req, res) => {
    res.clearCookie('jwt');
    return res.redirect('/');
}


module.exports = controller