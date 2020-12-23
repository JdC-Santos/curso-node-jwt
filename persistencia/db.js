const mysql = require('mysql');

module.exports = function() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'jdc',
        password: '123456',
        database: 'blog_jwt'
    });
}