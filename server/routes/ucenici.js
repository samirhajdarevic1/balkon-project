const { Router } = require('express');
const express = require('express');

const uceniciController = require('../controllers/ucenici');
const ocjeneController = require('../controllers/ocjene');
const odjeljenjaController = require('../controllers/odjeljenja');
const predmetiController = require('../controllers/predmeti');

const router = express.Router();

//GET /ucenici

router.get('/', uceniciController.getUcenici);

router.get('/:idUcenik', uceniciController.getUcenik);

router.get(
  '/:idUcenik/:idRazred/:idPredmet/ocjene',
  ocjeneController.getOcjene
);

router.get('/:idUcenik/razredi', odjeljenjaController.getUcenikovaOdjeljenja);

router.get(
  '/:idUcenik/:idRazred/predmeti',
  predmetiController.getUcenikoviPredmeti
);

//POST /ucenik
router.post('/', uceniciController.createUcenik);

//DELETE
router.delete('/:idUcenik', uceniciController.deleteUcenik);

//PUT
router.put('/:idUcenik', uceniciController.putUpdateUcenik);

module.exports = router;
