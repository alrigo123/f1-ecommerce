const model = {}

model.registerUser = async (pool, name, last_name, email, username, passHash, address, img) => {
    const stmt = 'INSERT INTO user (name, last_name, email, username, password, address, img) VALUES (?,?,?,?,?,?,?)';
    const register_new_user = await pool.query(stmt, [name, last_name, email, username, passHash, address, img]);
    return register_new_user;
}

//function to get an user by user 
model.findUserByUsername = async (pool, username) => {
    const stmt = 'SELECT * FROM user WHERE username = ?';
    const get_single_user = await pool.query(stmt, [username]);
    const data_user = await get_single_user
    return data_user[0][0];
}

model.findUserByEmail = async (pool, email) => {
    const stmt = 'SELECT * FROM user WHERE email = ?';
    const get_single_user = pool.query(stmt, [email]);
    const data_user = await get_single_user
    return data_user[0][0];
}

model.findUserById = async (pool, id_user) => {
    const stmt = 'SELECT * FROM user WHERE id_user = ?';
    const get_single_user = pool.query(stmt, [id_user]);
    const data_user = await get_single_user
    return data_user[0][0];
}
//i think that would exist to resave a password, update password or change something like username



module.exports = model;