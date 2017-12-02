var express = require('express');
var router = express.Router();
var mysql = require('../model/cart');


router.get('/', function(req, res, next) {
    mysql.getCart(req.headers, function(result) {
        res.json(result);
    });
});

router.delete('/:product_id', function(req, res, next) {
    mysql.deleteProductCart(req, function(result) {
        res.json(result);
    });
});

router.post('/', function(req, res, next) {
    mysql.insertProductCart(req, function(result) {
        res.json(result);
    });
});

module.exports = router;