const sqlConnection = require('./sqlConnection');

// Return an object with 'total_products' for each category
function getCatgories(callback) {
    var queryString =
        'SELECT c.id,c.category_name, COUNT(p.id) as total_products FROM products as p ' +
        'join categories as c on p.category_id = c.id group by c.id';
    sqlConnection.query(queryString, function(err, result, field) {
        callback(result);
    });
}

module.exports = {
    getCatgories: getCatgories
};