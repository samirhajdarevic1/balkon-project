const { Router } = require('express');
const express = require('express');

const loginController = require('../controllers/login');

const router = express.Router();

//POST /user
router.post('/', loginController.loginUser);

module.exports = router;
