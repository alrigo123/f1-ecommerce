
/* LOGIN JWT with modeling BD
        const pool = await connection;
        const data_user = await user_model.findUserByUsername(pool, username);

        const user_username = await data_user.username;
        const user_length = await user_username[0].length;

        req.user = data_user.name;

        // console.log(value.length)

        // throw new Error('FINISH');

        // console.log(user_username[0].length);
        console.log(data_user.id_user);
        // console.log(user_username);
        // console.log(user_length);

        // throw new Error('Invalid username or password');
        if (user_length < 1 || !(await bcrypt.compare(password, data_user.password))) {
            errors.push({ msg: 'Invalid username or password' });
            console.log("INVALID USERNAME OR PASSWORD");
            res.status(401).redirect('/');
        } else {
            console.log("VALID USERNAME");
            const token = generateToken(data_user.id_user);
            const cookie_options = {
                httpOnly: true,
                expiresIn: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000)
            }
            res.cookie('login', token, cookie_options);

            return res.status(200).redirect('/');
        }
*/

/* LGOIN JWT "NORMAL"

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
                    expiresIn: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000)
                };
                res.cookie('jwt', token, cookie_options);
                res.redirect('/');
            }
        })
*/

/* isLogged BD Moodel
            console.log(req.cookies.login)
            const pool = await connection;
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

/* isLogged Normal
console.log("Existe cookie");
            const decoded = await promisify(jwt.verify,{clockTimestamp: new Date().getTime()})(token, process.env.JWT_SECRET);
            connection.query('SELECT * FROM user WHERE id_user = ?', [decoded.id_user], (err, user) => {
                if (!user) {
                    return next()
                }   
                req.user = user[0]
                return next();
            })
*/

/* isAuthenticated
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
*/

/* Generate Token 
function generateToken(id_user) {
    return jwt.sign({ id_user }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_COOKIE_EXPIRES});
}
*/

/* Logout cookies
res.clearCookie('jwt');
    return res.redirect('/');
*/