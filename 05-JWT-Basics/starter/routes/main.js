const express = require('express');
const router = express.Router();

const { login, dashboard } = require('../controllers/main');

const authenticationMiddleware = require('../middleware/auth');

// syntax is router.route('routeURL').method(controllerFunction)
router.route('/dashboard').get(authenticationMiddleware, dashboard);
router.route('/login').post(login);

module.exports = router;