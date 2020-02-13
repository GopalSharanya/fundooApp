const express = require('express');
const router = express.Router();
const controller = require('../controller/controller.js');
const token = require('../middleware/token')

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/forgotPassword', controller.forgotPassword);
router.post('/resetpassword', token.verify, controller.resetpassword)

module.exports = router;