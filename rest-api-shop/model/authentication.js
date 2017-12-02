const sqlConnection = require('./sqlConnection');
var sha1 = require('sha1'); // Encription module

// Checks if the username and the password sent in the headers are correc
// and the user has admin privileges
function authenticateAdmin(headers, callback) {
    var queryString =
        'SELECT * FROM users WHERE username = "' +
        headers.username +
        '" AND password = "' +
        sha1(headers.password) +
        '" and privileges = 1';
    sqlConnection.query(queryString, function(err, result, field) {
        callback(result);
    });
}

// Checks if the username and the password sent in the headers are correct
function authenticateUser(headers, callback) {
    var queryString =
        'SELECT * FROM users WHERE username = "' +
        headers.username +
        '" AND password = "' +
        sha1(headers.password) +
        '"';
    console.log(queryString);
    sqlConnection.query(queryString, function(err, result, field) {
        callback(result);
    });
}

module.exports = {
    authenticateAdmin: authenticateAdmin,
    authenticateUser: authenticateUser
};