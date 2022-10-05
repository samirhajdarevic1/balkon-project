import { nastavniciTypes } from './types';

export const ucitajSveNastavnike = () => async (dispatch) => {
  try {
    dispatch({ type: nastavniciTypes.UCITAJ_NASTAVNIKE_REQUEST });
    const response = await fetch('http://localhost:3001/nastavnici');
    const result = await response.json();
    dispatch({
      type: nastavniciTypes.UCITAJ_NASTAVNIKE_SUCCESS,
      payload: result.nastavnici,
    });
  } catch (error) {
    dispatch({
      type: nastavniciTypes.UCITAJ_NASTAVNIKE_ERROR,
      error: error.message,
    });
  }
};

export const ucitajNastavnika = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: nastavniciTypes.UCITAJ_NASTAVNIKA_REQUEST });
      const response = await fetch(`http://localhost:3001/nastavnici/${id}`);
      const result = await response.json();
      console.log(result.nastavnik);
      if (!result.nastavnik) {
        dispatch({
          type: nastavniciTypes.UCITAJ_NASTAVNIKA_SUCCESS,
          payload: [],
          //payload: result.nastavnik,
        });
      }
      dispatch({
        type: nastavniciTypes.UCITAJ_NASTAVNIKA_SUCCESS,
        payload: result.nastavnik,
      });
    } catch (error) {
      dispatch({
        type: nastavniciTypes.UCITAJ_NASTAVNIKA_ERROR,
        error: error.message,
      });
    }
  };
};

export const obrisiNastavnika = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: nastavniciTypes.OBRISI_NASTAVNIKA_REQUEST });
      const response = await fetch(`http://localhost:3001/nastavnici/${id}`, {
        method: 'DELETE',
      });
      await response.json();
      dispatch({
        type: nastavniciTypes.OBRISI_NASTAVNIKA_SUCCESS,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: nastavniciTypes.OBRISI_NASTAVNIKA_ERROR,
        error: error.message,
      });
    }
  };
};
