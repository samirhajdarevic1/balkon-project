const ZakljucnaOcjena = require('../models/zakljucne-ocjene');
const { errorResponse, successResponse } = require('./error');

exports.getZakljucneOcjene = async (req, res, next) => {
  try {
    const zakljucneOcjene = await ZakljucnaOcjena.fetchAll();
    if (zakljucneOcjene) {
      return res.json({ zakljucneOcjene });
    }
    return errorResponse(res, 'Nastavnici not found', 404);
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.getZakljucnaOcjena = async (req, res, next) => {
  try {
    /*  const idZakljucnaOcjena = req.params.idZakljucnaOcjena; */
    const idUcenik = req.params.idUcenik;
    const idPredmet = req.params.idPredmet;
    const idSkolskaGodina = req.params.idSkolskaGodina;
    const zakljucnaOcjena = await ZakljucnaOcjena.findByPk(
      idUcenik,
      idPredmet,
      idSkolskaGodina
    );
    if (zakljucnaOcjena) {
      return res.json({ zakljucnaOcjena });
    } else {
      return [];
    }
    /*     return errorResponse(res, 'Zakljucna ocjena not found', 404); */
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.createZakljucnaOcjena = async (req, res, next) => {
  try {
    console.log(req.body);
    const { id_skolska_godina, id_predmet, id_ucenik, zakljucnaOcjena } =
      req.body;
    const zakljucnaOcj = new ZakljucnaOcjena({
      id_skolska_godina,
      id_predmet,
      id_ucenik,
      zakljucnaOcjena,
    });
    console.log(zakljucnaOcj);
    await zakljucnaOcj.save();
    return successResponse(res, 200, zakljucnaOcj);
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.putUpdateZakljucnaOcjena = async (req, res, next) => {
  try {
    const idZakljucnaOcjena = req.params.idZakljucnaOcjena;
    const { idSkolskaGodina, idPredmet, idUcenik, zakljucnaOcjena } = req.body;
    const zakljucnaOcj = await ZakljucnaOcjena.findByPk(idZakljucnaOcjena);
    if (!zakljucnaOcj) {
      return errorResponse(res, 'Nastavnik not found', 404);
    }
    zakljucnaOcj.idSkolskaGodina = idSkolskaGodina;
    zakljucnaOcj.idPredmet = idPredmet;
    zakljucnaOcj.idUcenik = idUcenik;
    zakljucnaOcj.zakljucnaOcjena = zakljucnaOcjena;
    await zakljucnaOcj.save();
    return successResponse(res, 200, zakljucnaOcj);
  } catch (err) {
    console.log(err);
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.deleteZakljucnaOcjena = async (req, res, next) => {
  try {
    const idZakljucnaOcjena = req.params.idZakljucnaOcjena;
    const zakljucnaOcjena = await ZakljucnaOcjena.findByPk(idZakljucnaOcjena);
    if (!zakljucnaOcjena) {
      return errorResponse(res, 'Nastavnik not found', 404);
    }
    await zakljucnaOcjena.delete();
    return res.json({ message: 'Successfuly deleted' });
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};
