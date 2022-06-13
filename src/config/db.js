const mysql = require('mysql2');

const connection = mysql.createConnection({
    multipleStatements: true,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE
});

connection.connect((err) => {
    if (err) {
        console.error("Error: " + err.stack + "(" + err.code + ")")
        return;
    }
    console.error("Connected! ID: " + connection.threadId);
})
module.exports = connection;