const express = require('express');
const router = express.Router();
// const encryption = require('../helpers/encryption');

const UserController = require('../controllers/users');

// router.route('/').post(encryption.hashPassword, UserController.createUser);
router.route('/').post(UserController.createUser);
router.route('/:email').get(UserController.findUser);
router.route('/emailbyid').post(UserController.userEmailById);
router.route('/jobs/:email').get(UserController.publishedJobsByEmail);

router.route('/validate').post(UserController.validateUser);

module.exports = router;
