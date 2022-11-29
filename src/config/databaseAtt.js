module.exports = {
  database: {
    /*
    //Local
    host: 'localhost',
    user: 'root',
    password: 'cjmxc100',
    database: 'f1-ecommerce'
    */

    /*
    //Clever Cloud
    host: process.env.DB_HOST,
    user: process.env.DB_PASSWORD,
    password: process.env.DB_USER,
    database: process.env.DB_NAME,
    */

    //docker
    host: 'localhost',
    user: 'root',
    password: 'cjmxc100',
    port: 3333,
    database: 'f1_ecommerce'
  },
}