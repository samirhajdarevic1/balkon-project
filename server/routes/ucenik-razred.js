const { Router } = require('express');
const express = require('express');

const ucenikRazredController = require('../controllers/ucenik-razred');

const router = express.Router();

router.post('/:idRazred/:idUcenik', ucenikRazredController.createUcenikURazred);

module.exports = router;
