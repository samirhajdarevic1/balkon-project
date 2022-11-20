const { Router } = require('express');
const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

//POST /user
router.post('/', userController.createUser);

module.exports = router;
