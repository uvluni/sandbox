const sqlConnection = require('./sqlConnection');
const auth = require('./authentication');

// Return an object with users's cart (user and password are sent in the headers)
// User authentication needed, data sent in the headers
function getCart(headers, callback) {
    auth.authenticateUser(headers, function(result) {
        if (result.length != 0) {
            var queryString = 'SELECT * FROM cart WHERE username = "' + headers.username + '"';
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

// Delete the product with the id specified in the DELETE query url
// User authentication needed, data sent in the headers
function deleteProductCart(req, callback) {
    auth.authenticateUser(req.headers, function(result) {
        if (result.length != 0) {
            var queryString = 'DELETE FROM cart WHERE product_id = ' + req.params.product_id +
                ' and username = "' + req.headers.username + '"';
            console.log(queryString);
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

// Inserting a product to the cart receiving {product_id} in the POST body
// User authentication needed, data sent in the headers
function insertProductCart(req, callback) {
    auth.authenticateUser(req.headers, function(result) {
        if (result.length != 0) {
            var queryString =
                'INSERT INTO cart (product_id,username) VALUES (' +
                req.body.product_id + ', "' + req.headers.username + '")';
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
    getCart: getCart,
    deleteProductCart: deleteProductCart,
    insertProductCart: insertProductCart
};