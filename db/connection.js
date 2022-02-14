const mysql = require ('mysql2');
const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'ChickenWing45',
    database: 'manage'
});

module.exports = connection;