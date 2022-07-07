const mysql = require('mysql2/promise');
const {database} = require('./databaseAtt');
const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) throw err.message;
    console.log(`Database ${database.database} connected successfully`);
    connection.release(); // Breaks connection
})

module.exports = pool;