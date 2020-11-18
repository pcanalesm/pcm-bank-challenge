const express = require('express');
const userController = require('../controller/user.controller');
const router = express.Router();


router.get('/auth', userController.auth);
router.post('/user/create', userController.create);
router.get('/user/dni/get/:dni', userController.getUserByDni);

module.exports = router;