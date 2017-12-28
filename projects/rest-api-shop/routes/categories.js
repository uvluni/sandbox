var express = require('express');
var router = express.Router();
var mysql = require('../model/categories');


router.get('/', function(req, res, next) {
    mysql.getCatgories(function(result) {
        res.json(result);
    });
});

module.exports = router;