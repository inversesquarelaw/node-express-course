const express = require('express');
const router = express.Router();

const { login, dashboard } = require('../controllers/main');

// syntax is router.route('routeURL').method(controllerFunction)
router.route('/dashboard').get(dashboard);
router.route('/login').post(login);

module.exports = router;