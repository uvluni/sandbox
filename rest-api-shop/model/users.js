const sqlConnection = require('./sqlConnection');
var sha1 = require('sha1');
const auth = require('./authentication');


// Deprecated
function getUser(username, callback) {
    var queryString = 'SELECT username FROM users WHERE username = "' + username + '"';
    sqlConnection.query(queryString, function(err, result, field) {
        callback(result);
    });
}

// Insert a user by receiving its object in the POST body
// No authentication needed
function insertUser(req, callback) {
    var incryptedPassword = sha1(req.body.password);
    var queryString =
        'INSERT INTO users (username,password,privileges) VALUES ("' +
        req.body.username +
        '", "' +
        incryptedPassword +
        '", 0)';
    sqlConnection.query(queryString, function(err, result, field) {
        callback(result);
    });
}

// Delete a user with the id specified in the query url
// Only the user can delete himself
function deleteUser(req, callback) {
    auth.authenticateUser(req.headers, function(result) {
        if (result.length != 0) {
            var queryString = 'DELETE FROM users WHERE username = "' + req.params.username + '"';
            sqlConnection.query(queryString, function(err, result, field) {
                if (!result) {
                    result = { messge: 'insertion error' };
                }
                callback(result);
            });
        } else {
            result = { message: 'authentication error' };
            callback(result);
        }
    });
}

// Update the user password by receiving a user object in the PUT body
// Only the user can update himself
function updateUserPassword(req, callback) {
    auth.authenticateUser(req.headers, function(result) {
        if (result.length != 0) {
            var queryString = 'UPDATE users SET password = "' + sha1(req.body.password) +
                '" WHERE username = "' + req.headers.username + '"';
            sqlConnection.query(queryString, function(err, result, field) {
                if (!result) {
                    result = { messge: 'insertion error' };
                }
                callback(result);
            });
        } else {
            result = { message: 'authentication error' };
            callback(result);
        }
    });
}




module.exports = {
    getUser: getUser,
    insertUser: insertUser,
    deleteUser: deleteUser,
    updateUserPassword: updateUserPassword
};