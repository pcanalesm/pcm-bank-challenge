const express = require('express');
const accountController = require('../controller/account.controller');
const session_security = require('../secutiry/session.security');
const router = express.Router();


router.post('/account/deposit', session_security, accountController.addAmount);
router.post('/account/order', session_security, accountController.removeAmount);
router.post('/account/transfer', session_security, accountController.transfer);
router.get('/account/get/:dni', session_security, accountController.validateDestinyAccount);
router.get('/account/get', session_security, accountController.getStatusAccount);


module.exports = router;