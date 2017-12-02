var express = require('express');
var router = express.Router();
var mysql = require('../model/products');

router.get('/:category_id', function(req, res, next) {
    mysql.getProducts(req.params.category_id, function(result) {
        res.json(result);
    });
});

router.delete('/:product_id', function(req, res, next) {
    mysql.deleteProduct(req, function(result) {
        res.json(result);
    });
});

router.post('/', function(req, res, next) {
    mysql.insertProduct(req, function(result) {
        res.json(result);
    });
});

router.put('/', function(req, res, next) {
    mysql.updateProduct(req, function(result) {
        res.json(result);
    });
});

module.exports = router;