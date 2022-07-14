
/* LOGIN JWT
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
                expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000)
            }

            res.cookie('login', token, cookie_options);

            return res.status(200).redirect('/');
        }
        */