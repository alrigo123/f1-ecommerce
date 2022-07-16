const jwt = require('jsonwebtoken');
const { stringify } = require('querystring');
const { promisify } = require('util');
const connection = require('../config/connection');
const user_model = require('../models/user.model')

const middleware = {}

middleware.isLogged = async (req, res, next) => {
    const token = req.cookies.login
    if (token) {
        try {
            const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
            connection.query('SELECT * FROM user WHERE id_user = ?', [decoded.id_user], (err, user) => {
                if (err) throw err;
                console.log("erroro");
                if (user) {
                    req.user = user[0]
                    console.log(req.user);
                    return next()
                } else {
                    return next();
                }
            })
        } catch (error) {
            console.log("Error: ", error)
            return next();
        }
    } else {
        // res.redirect('/');
        return next()
    }
}

module.exports = middleware;