const mysql = require ('mysql2');
const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'Enter your own password',
    database: 'manage'
});

module.exports = connection;