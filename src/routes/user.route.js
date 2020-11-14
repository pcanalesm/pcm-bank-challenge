const express = require('express');
const userController = require('../controller/user.controller');
const router = express.Router();


router.get('/auth', userController.auth);

module.exports = router;