import { predmetiTypes } from './types';

export const ucitajSvePredmete = () => async (dispatch) => {
  try {
    dispatch({ type: predmetiTypes.UCITAJ_PREDMETE_REQUEST });
    const response = await fetch('http://localhost:3001/predmeti');
    const result = await response.json();
    dispatch({
      type: predmetiTypes.UCITAJ_PREDMETE_SUCCESS,
      payload: result.predmeti,
    });
  } catch (error) {
    dispatch({
      type: predmetiTypes.UCITAJ_PREDMETE_ERROR,
      error: error.message,
    });
  }
};

export const ucitajPredmet = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: predmetiTypes.UCITAJ_PREDMET_REQUEST });
      const response = await fetch(`http://localhost:3001/predmeti/${id}`);
      const result = await response.json();
      console.log(result.predmet);
      if (!result.predmet) {
        dispatch({
          type: predmetiTypes.UCITAJ_PREDMET_SUCCESS,
          payload: [],
          //payload: result.nastavnik,
        });
      }
      dispatch({
        type: predmetiTypes.UCITAJ_PREDMET_SUCCESS,
        payload: result.predmet,
      });
    } catch (error) {
      dispatch({
        type: predmetiTypes.UCITAJ_PREDMET_ERROR,
        error: error.message,
      });
    }
  };
};

export const obrisiPredmet = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: predmetiTypes.OBRISI_PREDMET_REQUEST });
      const response = await fetch(`http://localhost:3001/predmeti/${id}`, {
        method: 'DELETE',
      });
      await response.json();
      dispatch({
        type: predmetiTypes.OBRISI_PREDMET_SUCCESS,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: predmetiTypes.OBRISI_PREDMET_ERROR,
        error: error.message,
      });
    }
  };
};
