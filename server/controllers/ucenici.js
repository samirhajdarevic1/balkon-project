const Ucenik = require('../models/ucenici');
const { errorResponse, successResponse } = require('./error');

exports.getUcenici = async (req, res, next) => {
  try {
    const { idOdjeljenja } = req.params;
    if (idOdjeljenja) {
      const ucenici = await Ucenik.fetchAll(idOdjeljenja);
      if (ucenici) {
        return res.json({ ucenici });
      }
    } else {
      const ucenici = await Ucenik.fetchAll();
      if (ucenici) {
        return res.json({ ucenici });
      }
    }
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.getUceniciIzRazreda = async (req, res, next) => {
  try {
    const razredId = req.query.idOdjeljenja;
    if (razredId) {
      const ucenik = await Ucenik.findByPk(razredId);
      if (ucenik) {
        return res.json({ ucenici });
      }
    }
    return errorResponse(res, 'Ucenici not found', 404);
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};
exports.getUcenik = async (req, res, next) => {
  try {
    const idUcenik = req.params.idUcenik;
    const razredId = req.query.idOdjeljenja;
    if (razredId) {
      const ucenik = await Ucenik.findByPk(idUcenik, razredId);
      if (ucenik) {
        return res.json({ ucenik });
      }
    } else {
      const ucenik = await Ucenik.findByPk(idUcenik);
      if (ucenik) {
        return res.json({ ucenik });
      }
    }
    return errorResponse(res, 'Ucenik not found', 404);
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.createUcenik = async (req, res, next) => {
  try {
    const {
      ime,
      prezime,
      birthday,
      image,
      imeOca,
      imeMajke,
      maticniBroj,
      adresa,
    } = req.body;
    const ucenik = new Ucenik({
      ime,
      prezime,
      birthday,
      image,
      imeOca,
      imeMajke,
      maticniBroj,
      adresa,
    });
    console.log(ucenik);
    await ucenik.save();
    return successResponse(res, 200, ucenik);
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.putUpdateUcenik = async (req, res, next) => {
  try {
    const idUcenik = req.params.idUcenik;
    const {
      ime,
      prezime,
      birthday,
      image,
      imeOca,
      imeMajke,
      adresa,
      maticniBroj,
    } = req.body;
    const ucenik = await Ucenik.findByPk(idUcenik);
    if (!ucenik) {
      return errorResponse(res, 'Nastavnik not found', 404);
    }
    ucenik.ime = ime;
    ucenik.prezime = prezime;
    ucenik.birthday = birthday;
    ucenik.image = image;
    ucenik.imeMajke = imeMajke;
    ucenik.imeOca = imeOca;
    ucenik.adresa = adresa;
    ucenik.maticniBroj = maticniBroj;
    await ucenik.save();
    return successResponse(res, 200, ucenik);
  } catch (err) {
    console.log(err);
    return errorResponse(res, 'Internal server error', 500, err);
  }
};

exports.deleteUcenik = async (req, res, next) => {
  try {
    const idUcenik = req.params.idUcenik;
    const ucenik = await Ucenik.findByPk(idUcenik);
    if (!ucenik) {
      return errorResponse(res, 'Nastavnik not found', 404);
    }
    await ucenik.delete();
    return res.json({ message: 'Successfuly deleted' });
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};
