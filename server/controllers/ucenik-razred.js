const UcenikRazred = require('../models/ucenik-razred');
const { errorResponse, successResponse } = require('./error');

exports.createUcenikURazred = async (req, res, next) => {
  try {
    const { idRazred, idUcenik } = req.body;
    const ucenikRazred = new UcenikRazred({
      idUcenik,
      idRazred,
    });
    await ucenikRazred.save();
    return res.json({
      message: 'Successfully created!',
      ucenikRazred: ucenikRazred,
    });
  } catch (err) {
    return errorResponse(res, 'Internal server error', 500, err);
  }
};
