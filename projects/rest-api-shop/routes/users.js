var express = require('express');
var router = express.Router();
var mysql = require('../model/users');

router.get('/:user_id', function(req, res, next) {
    mysql.getUser(req.params.user_id, function(result) {
        res.json(result);
    });
});

router.post('/', function(req, res, next) {
    mysql.insertUser(req, function(result) {
        res.json(result);
    });
});

router.delete('/:username', function(req, res, next) {
    mysql.deleteUser(req, function(result) {
        res.json(result);
    });
});

router.put('/', function(req, res, next) {
    mysql.updateUserPassword(req, function(result) {
        res.json(result);
    });
});

module.exports = router;