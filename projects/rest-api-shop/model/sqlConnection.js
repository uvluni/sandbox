const mysql = require('mysql');

var sqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'shop'
});

sqlConnection.connect(function(err) {
    if (err) throw err;
});

module.exports = sqlConnection;