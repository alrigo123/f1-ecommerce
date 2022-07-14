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
                if (!user) {
                    return next()
                }
                req.user = user[0]
                return next();
            })

            /*
            console.log(req.cookies.login)
            const pool = await connection;
            console.log("Existe cookie");
            const decoded = await jwt.promisify(jwt.verify)(req.cookies.login, process.env.JWT_SECRET);
            const token_parsed = JSON.parse(stringify(decoded));

            console.log(token_parsed);

            const user_token = await user_model.findUserById(pool, token_parsed.id_user)
            const data_user = await user_model.findUserById(pool, id_user)
            const user_id = await data_user.id_user;
            const user_length = await user_id[0].length;

            console.log(decoded);

            throw new Error('No cookie');
            if (user_token.length < 1) return next();

            req.user = await user_token[0];
            return next();
            */
        } catch (error) {
            console.log("Error: ", error)
            return next();
        }
    } else {
        res.redirect('/');
    }
}

module.exports = middleware;