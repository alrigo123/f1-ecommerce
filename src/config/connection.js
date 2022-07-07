const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    // host: 'bonojnrvv9qple6b38tn-mysql.services.clever-cloud.com',
    host: 'localhost',
    // user: 'udc2qmck4vt3pp6f',
    user: 'root',
    // password: 'SZ4q9X6MFiglcPI8uJt4',
    password: 'cjmxc100',
    // database: 'bonojnrvv9qple6b38tn',
    database: 'f1-ecommerce',
});

pool.getConnection((err, connection) => {
    if (err) throw err.message;
    console.log(`Database ${database.database} connected successfully`);
    connection.release(); // Breaks connection
})

module.exports = pool;