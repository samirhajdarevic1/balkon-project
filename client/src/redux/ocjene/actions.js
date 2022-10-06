import { ocjeneTypes } from './types';

export const ucitajSveOcjene = () => async (dispatch) => {
  try {
    dispatch({ type: ocjeneTypes.UCITAJ_OCJENE_REQUEST });
    const response = await fetch('http://localhost:3001/ocjene');
    const result = await response.json();
    dispatch({
      type: ocjeneTypes.UCITAJ_OCJENE_SUCCESS,
      payload: result.ocjene,
    });
  } catch (error) {
    dispatch({
      type: ocjeneTypes.UCITAJ_OCJENE_ERROR,
      error: error.message,
    });
  }
};

export const ucitajOcjenu = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ocjeneTypes.UCITAJ_OCJENU_REQUEST });
      const response = await fetch(`http://localhost:3001/ocjene/${id}`);
      const result = await response.json();
      dispatch({
        type: ocjeneTypes.UCITAJ_OCJENU_SUCCESS,
        payload: result.ocjena,
      });
    } catch (error) {
      dispatch({
        type: ocjeneTypes.UCITAJ_OCJENU_ERROR,
        error: error.message,
      });
    }
  };
};

export const obrisiOcjenu = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ocjeneTypes.OBRISI_OCJENU_REQUEST });
      const response = await fetch(`http://localhost:3001/nastavnici/${id}`, {
        method: 'DELETE',
      });
      await response.json();
      dispatch({
        type: ocjeneTypes.OBRISI_OCJENU_SUCCESS,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: ocjeneTypes.OBRISI_OCJENU_ERROR,
        error: error.message,
      });
    }
  };
};
