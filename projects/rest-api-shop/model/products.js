const sqlConnection = require('./sqlConnection');
const auth = require('./authentication');

// Return an object with all products of the category id specified in the query url
function getProducts(categorie_id, callback) {
    var queryString = 'SELECT * FROM products WHERE category_id = ' + categorie_id;
    sqlConnection.query(queryString, function(err, result, field) {
        callback(result);
    });
}

// Delete the product with the id specified in the query url
// Admin authentication needed
function deleteProduct(req, callback) {
    auth.authenticateAdmin(req.headers, function(result) {
        if (result.length != 0) {
            var queryString = 'DELETE FROM products WHERE id = ' + req.params.product_id;
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

// Insert a product by receiving a product object in the POST body
// Admin authentication needed
function insertProduct(req, callback) {
    auth.authenticateAdmin(req.headers, function(result) {
        if (result.length != 0) {
            var queryString =
                'INSERT INTO products (id,category_id,name,image,price,sku) VALUES (' +
                req.body.id +
                ', ' +
                req.body.category_id +
                ', "' +
                req.body.name +
                '", "' +
                req.body.image +
                '", ' +
                req.body.price +
                ',' +
                req.body.sku +
                ')';
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

// Update a product by receiving a product object in the PUT body
// Admin authentication needed
function updateProduct(req, callback) {
    auth.authenticateAdmin(req.headers, function(result) {
        if (result.length != 0) {
            var queryString = 'UPDATE products SET ';
            if (req.body.category_id) {
                queryString += 'category_id = ' + req.body.category_id + ',';
            }
            if (req.body.name) {
                queryString += 'name = "' + req.body.name + '",';
            }
            if (req.body.image) {
                queryString += 'image = "' + req.body.image + '",';
            }
            if (req.body.price) {
                queryString += 'price = ' + req.body.price + ',';
            }
            if (req.body.sku) {
                queryString += 'sku = ' + req.body.sku + ',';
            }
            if (queryString[queryString.length - 1] == ',') {
                queryString = queryString.substring(0, queryString.length - 1);
            }
            queryString += ' WHERE id = ' + req.body.id;
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
    getProducts: getProducts,
    deleteProduct: deleteProduct,
    insertProduct: insertProduct,
    updateProduct: updateProduct
};